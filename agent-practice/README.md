# Agent practice: folder summarizer

A small agent built on the Claude Agent SDK (Python). It reads every document in `inputs/`, then writes one page to `outputs/summary.md` listing the main themes, open questions, and decisions named in the documents.

It is deliberately fenced in. It can read anywhere under this folder and write only inside `outputs/`. It cannot run shell commands, edit existing files, reach the web, send, post, or delete.

## Files

| File | What it is |
| --- | --- |
| `agent.py` | The agent. Read it top to bottom; the sections are numbered in the order you will want to change things. |
| `check_guard.py` | Proves the fence holds. Asks the agent to misbehave and shows the refusals. |
| `inputs/` | Three fictional sample documents about a mentoring pilot. Replace them with your own. |
| `outputs/summary.md` | What the agent wrote on its last run. |
| `requirements.txt` | One dependency: `claude-agent-sdk`. |

## Setup (once)

**1. Get an API key.** Sign in at the Claude Console (https://platform.claude.com/), open API Keys, create a key, and copy it. It starts with `sk-ant-`. You will only see it once.

**2. Put the key in your shell.** This is for the terminal session where you will run the agent.

macOS or Linux:

```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Windows PowerShell:

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-your-key-here"
```

To make it stick across terminals on a Mac, add the `export` line to `~/.zshrc`, then open a new terminal. The SDK reads the key from the environment of the process that runs the agent. It does not read `.env` files.

Check it took:

```bash
echo $ANTHROPIC_API_KEY | cut -c1-10
```

You should see `sk-ant-` plus a few characters.

**3. Install the SDK.** From this folder:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Python 3.10 or newer is required. The SDK bundles the Claude Code engine, so there is nothing else to install.

## Run it

```bash
source .venv/bin/activate
python agent.py
```

You will see each tool call as it happens, a cost line, and then the finished summary. A run on the three sample documents takes about 15 seconds and costs about 25 cents on Claude Opus 5.5.

To summarize a different folder:

```bash
python agent.py --inputs ~/Documents/board-packet --outputs ~/Desktop
```

To prove the fence holds:

```bash
python check_guard.py
```

## Change it

Open `agent.py`. Each numbered section is one thing you might change.

- **Different output format.** Edit `build_task_prompt`. The Markdown skeleton in that string is exactly what the agent produces.
- **Different standing rules.** Edit `SYSTEM_PROMPT`. That is the agent's role; the task prompt is the job for one run.
- **Let it write more than one file.** The guard already allows any path inside `outputs/`. Change the task prompt to ask for more files.
- **Let it run shell commands.** Remove `"Bash"` from `DISALLOWED_TOOLS` and add a `Bash` branch to the guard that allows the specific commands you want. Think twice.
- **Cheaper runs.** Change `model` to `"claude-sonnet-5-5"` or `"claude-haiku-5-5"`.
- **Longer jobs.** Raise `max_turns`. One turn is one round trip of model call plus tool results.
