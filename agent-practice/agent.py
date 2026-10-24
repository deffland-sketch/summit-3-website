"""
Practice agent built on the Claude Agent SDK (Python).

What it does
    Reads every document in an inputs folder and writes a one-page summary
    (main themes, open questions, decisions named) to outputs/summary.md.

What it is allowed to do
    Read-only tools (Read, Glob, Grep) anywhere under this folder, plus Write,
    but only to files inside the outputs folder. It can never run shell
    commands, edit existing files, fetch the web, send, post, or delete.

Run it
    export ANTHROPIC_API_KEY=sk-ant-...
    python agent.py
    python agent.py --inputs some/folder --outputs some/other/folder

The file is laid out in the order you will want to change things:
    1. PATHS        where it reads from and writes to
    2. PROMPT       what we ask the agent to do and how the output should look
    3. TOOLS        which tools the agent can see and which are pre-approved
    4. PERMISSIONS  the guard that blocks anything outside the rules
    5. RUN          the loop that streams the agent's work to your terminal
"""

import argparse
import asyncio
import sys
from pathlib import Path

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    HookMatcher,
    ResultMessage,
    TextBlock,
    ToolUseBlock,
    query,
)

# ---------------------------------------------------------------------------
# 1. PATHS
# ---------------------------------------------------------------------------
# Both folders live next to this file by default. Pass --inputs / --outputs
# to point somewhere else. Everything is resolved to an absolute path so the
# permission guard below can compare paths safely.

HERE = Path(__file__).resolve().parent
DEFAULT_INPUTS = HERE / "inputs"
DEFAULT_OUTPUTS = HERE / "outputs"

# ---------------------------------------------------------------------------
# 2. PROMPT
# ---------------------------------------------------------------------------
# The system prompt is the agent's standing role: who it is and the rules it
# always follows. The task prompt is the specific job for this run. Keeping
# them separate means you can reuse the role with a different job later.

SYSTEM_PROMPT = """You are a careful document analyst. You read a folder of
documents and write one short, well-organized summary.

Rules you always follow:
- Read every document in the inputs folder before writing anything. Use Glob
  to list the files, then Read each one in full.
- Only report what the documents actually say. If something is unclear or
  missing, say so instead of guessing.
- Attribute each point to its source document by filename in parentheses.
- Write plain, direct prose. No em-dashes. No filler.
- You may write exactly one file: the summary file you are given. Do not
  create, modify, or delete anything else.
"""


def build_task_prompt(inputs_dir: Path, summary_path: Path) -> str:
    return f"""Read every document in {inputs_dir} and write a one-page
summary to {summary_path}.

Use this exact structure, in Markdown:

# Summary of documents in {inputs_dir.name}/

_One sentence saying how many documents were read and what they cover._

## Main themes
- 3 to 6 bullets. Each names a theme that appears across documents and cites
  the source filenames in parentheses.

## Open questions
- Questions the documents raise but do not answer. One bullet each, with the
  source filename in parentheses.

## Decisions named
- Decisions the documents say were made, with who made them if stated and the
  source filename in parentheses. If a document says a decision is pending,
  list it under Open questions instead.

Keep the whole file under 400 words. Write the file once, then stop and
reply with one sentence confirming what you wrote.
"""


# ---------------------------------------------------------------------------
# 3. TOOLS
# ---------------------------------------------------------------------------
# Two lists do two different jobs.
#
# ALLOWED_TOOLS are pre-approved: the agent can call them without being asked.
# They are all read-only.
#
# DISALLOWED_TOOLS are removed from the agent's view entirely. It never sees
# that Bash or WebFetch exist, so it cannot even attempt them. Write is NOT in
# this list because the agent needs it for the summary file; the permission
# guard in section 4 limits where Write can go.

READ_ONLY_TOOLS = ["Read", "Glob", "Grep"]

DISALLOWED_TOOLS = [
    "Bash",            # no shell commands
    "Edit",            # no editing existing files
    "NotebookEdit",
    "WebFetch",        # no network
    "WebSearch",
    "Agent",           # no spawning subagents
    "TodoWrite",
    "Skill",
    "AskUserQuestion",
]

# ---------------------------------------------------------------------------
# 4. PERMISSIONS
# ---------------------------------------------------------------------------
# A PreToolUse hook runs before EVERY tool call, before any other permission
# check, and its "deny" wins in every permission mode. This is the hard floor.
#
# The rule it enforces:
#   - read-only tools: allow
#   - Write: allow only if the target file is inside the outputs folder
#   - anything else: deny
#
# Together with permission_mode="dontAsk" (section 5), anything the hook does
# not explicitly allow is denied rather than waiting for a human who is not
# there.


def make_permission_guard(outputs_dir: Path):
    outputs_dir = outputs_dir.resolve()

    async def guard(input_data, tool_use_id, context):
        tool = input_data.get("tool_name", "")
        tool_input = input_data.get("tool_input", {}) or {}
        event = input_data.get("hook_event_name", "PreToolUse")

        def allow(reason):
            return {
                "hookSpecificOutput": {
                    "hookEventName": event,
                    "permissionDecision": "allow",
                    "permissionDecisionReason": reason,
                }
            }

        def deny(reason):
            print(f"  [guard] DENIED {tool}: {reason}")
            return {
                "hookSpecificOutput": {
                    "hookEventName": event,
                    "permissionDecision": "deny",
                    "permissionDecisionReason": reason,
                }
            }

        if tool in READ_ONLY_TOOLS:
            return allow("read-only tool")

        if tool == "Write":
            target = Path(tool_input.get("file_path", "")).resolve()
            try:
                target.relative_to(outputs_dir)
            except ValueError:
                return deny(
                    f"Write is only allowed inside {outputs_dir}. "
                    f"Refused: {target}"
                )
            return allow(f"write inside {outputs_dir}")

        return deny(f"{tool} is not on the allowed list for this agent.")

    return guard


# ---------------------------------------------------------------------------
# 5. RUN
# ---------------------------------------------------------------------------
# query() starts the agent loop and streams back messages as it works. We
# print the agent's text, each tool call, and a final cost line, then show
# the finished summary.


def describe_tool_call(block: ToolUseBlock) -> str:
    args = block.input or {}
    if "file_path" in args:
        return f"{block.name}: {args['file_path']}"
    if "pattern" in args:
        return f"{block.name}: {args['pattern']}"
    return block.name


async def run(inputs_dir: Path, outputs_dir: Path) -> int:
    inputs_dir = inputs_dir.resolve()
    outputs_dir = outputs_dir.resolve()
    summary_path = outputs_dir / "summary.md"

    if not inputs_dir.is_dir() or not any(inputs_dir.iterdir()):
        print(f"No documents found in {inputs_dir}. Add some and run again.")
        return 1
    outputs_dir.mkdir(parents=True, exist_ok=True)

    options = ClaudeAgentOptions(
        cwd=str(HERE),
        system_prompt=SYSTEM_PROMPT,
        model="claude-opus-5-5",
        allowed_tools=READ_ONLY_TOOLS,
        disallowed_tools=DISALLOWED_TOOLS,
        permission_mode="dontAsk",
        hooks={"PreToolUse": [HookMatcher(hooks=[make_permission_guard(outputs_dir)])]},
        setting_sources=[],   # ignore any .claude/settings on this machine
        max_turns=30,
    )

    print(f"Reading from : {inputs_dir}")
    print(f"Writing to   : {summary_path}")
    print("-" * 60)

    result = None
    async for message in query(prompt=build_task_prompt(inputs_dir, summary_path), options=options):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, TextBlock) and block.text.strip():
                    print(block.text.strip())
                elif isinstance(block, ToolUseBlock):
                    print(f"  -> {describe_tool_call(block)}")
        elif isinstance(message, ResultMessage):
            result = message

    print("-" * 60)
    if result is None:
        print("The agent ended without a result message.")
        return 1

    cost = f"${result.total_cost_usd:.4f}" if result.total_cost_usd is not None else "n/a"
    print(f"Finished: {result.subtype} | turns: {result.num_turns} | "
          f"time: {result.duration_ms / 1000:.1f}s | cost: {cost}")

    if result.is_error:
        print(f"Error: {result.result}")
        return 1
    if not summary_path.exists():
        print("The agent finished but no summary file was written.")
        return 1

    print()
    print(summary_path.read_text())
    return 0


def main():
    parser = argparse.ArgumentParser(description="Summarize a folder of documents.")
    parser.add_argument("--inputs", type=Path, default=DEFAULT_INPUTS)
    parser.add_argument("--outputs", type=Path, default=DEFAULT_OUTPUTS)
    args = parser.parse_args()
    sys.exit(asyncio.run(run(args.inputs, args.outputs)))


if __name__ == "__main__":
    main()
