<#
.SYNOPSIS
  Roll back the 2030 strategy alignment of the Summit 3.0 site by reverting its merge commit on main.

.DESCRIPTION
  The 2030 alignment went to main as a single --no-ff merge commit:
    efe9539b7baedffab66cf8bf4255c9a82e2f0d54  "Merge branch '2030-alignment'"
  whose first parent is the previous site, 75d355aac93ac716397419dae90503b84e6c8ddc.

  This script reverts that merge commit (git revert -m 1), which adds one new commit on
  top of main that restores the previous site, and pushes it. History is preserved and
  nothing is force-pushed. Vercel redeploys main automatically after the push.

  Run it from anywhere inside a clone of the repository, on a machine whose git is
  signed in to GitHub with push access.

  Use -DryRun first. It fetches, checks everything, and prints the exact commands it
  would run, without changing the working tree or pushing.

  ALTERNATIVES
  1. The pre-alignment tag. pre-2030-align-2026-10-29 points at the previous site
     (75d355a). It was created in the cloud session, but GitHub refused the tag push,
     so it may exist only there. Recreate and push it yourself if you want it:
         git tag -a pre-2030-align-2026-10-29 75d355aac93ac716397419dae90503b84e6c8ddc -m "Site before 2030 alignment"
         git push origin pre-2030-align-2026-10-29
     The same commit is also on the branch backup/pre-2030-align-2026-10-29.
     To look at or rebuild the old site locally:
         git checkout pre-2030-align-2026-10-29      (or: git checkout backup/pre-2030-align-2026-10-29)
     Checking out the tag does not change production. To publish it, use this script
     (a revert keeps history) rather than resetting main.
  2. Vercel Instant Rollback. In the Vercel dashboard, open the project, go to
     Deployments, find the production deployment built from 75d355a (before the
     merge), open its menu, and choose "Promote to Production" (or "Instant Rollback").
     This switches production immediately without touching git. The next push to main
     redeploys main as usual, so follow up with this script if the rollback should stick.

.PARAMETER DryRun
  Print what would happen without changing anything.

.PARAMETER MergeCommit
  The merge commit to revert. Defaults to the most recent first-parent merge of the
  2030-alignment branch on main.

.PARAMETER Remote
  Git remote name. Default: origin.

.PARAMETER Branch
  Branch Vercel deploys to production. Default: main.

.EXAMPLE
  .\scripts\rollback-2030-alignment.ps1 -DryRun

.EXAMPLE
  .\scripts\rollback-2030-alignment.ps1
#>
[CmdletBinding()]
param(
  [switch]$DryRun,
  [string]$MergeCommit,
  [string]$Remote = 'origin',
  [string]$Branch = 'main'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Invoke-Git {
  # Runs a git command and stops the script if it fails. git writes progress to stderr
  # even on success, so stderr is captured as plain text and only the exit code decides
  # failure (Windows PowerShell 5.1 would otherwise treat that stderr as a terminating error).
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
  $previous = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    $output = & git @GitArgs 2>&1 | ForEach-Object { "$_" }
    $code = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previous
  }
  if ($code -ne 0) {
    throw "git $($GitArgs -join ' ') failed:`n$($output -join "`n")"
  }
  return $output
}

function Step {
  # Mutating step: printed in a dry run, executed otherwise.
  param([string]$Description, [string[]]$GitArgs)
  $cmd = "git $($GitArgs -join ' ')"
  if ($DryRun) {
    Write-Host "  [dry run] would run: $cmd   ($Description)" -ForegroundColor Yellow
  } else {
    Write-Host "  running: $cmd   ($Description)" -ForegroundColor Cyan
    Invoke-Git @GitArgs | ForEach-Object { Write-Host "    $_" }
  }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw 'git is not on PATH.'
}

$repoRoot = (Invoke-Git rev-parse --show-toplevel | Select-Object -First 1).Trim()
Set-Location $repoRoot
Write-Host "Repository: $repoRoot"
if ($DryRun) { Write-Host 'DRY RUN: nothing will be changed or pushed.' -ForegroundColor Yellow }

# 1. Working tree must be clean so the revert commit contains only the rollback.
$dirty = Invoke-Git status --porcelain
if ($dirty) {
  throw "Working tree has uncommitted changes. Commit or stash them first:`n$($dirty -join "`n")"
}

# 2. Fetch the latest main (read-only for the working tree).
Write-Host "Fetching $Remote/$Branch ..."
Invoke-Git fetch $Remote $Branch | Out-Null
$remoteRef = "$Remote/$Branch"

# 3. Find the merge commit.
if (-not $MergeCommit) {
  $MergeCommit = (Invoke-Git log $remoteRef --merges --first-parent -n 1 --grep=2030-alignment --format=%H | Select-Object -First 1)
  if (-not $MergeCommit) { throw "No merge of '2030-alignment' found on $remoteRef. Pass -MergeCommit explicitly." }
}
$MergeCommit = (Invoke-Git rev-parse --verify "$MergeCommit^{commit}" | Select-Object -First 1).Trim()

$parents = ((Invoke-Git log -1 --format=%P $MergeCommit | Select-Object -First 1).Trim() -split ' ')
if ($parents.Count -ne 2) { throw "$MergeCommit is not a two-parent merge commit." }
$subject = (Invoke-Git log -1 --format=%s $MergeCommit | Select-Object -First 1)

Write-Host ''
Write-Host "Merge commit to revert: $MergeCommit"
Write-Host "  subject:       $subject"
Write-Host "  restores site: $($parents[0]) (first parent, the site before the merge)"

# 4. The merge must be on main, and not already reverted.
& git merge-base --is-ancestor $MergeCommit $remoteRef 2>$null
if ($LASTEXITCODE -ne 0) { throw "$MergeCommit is not on $remoteRef." }

$alreadyReverted = Invoke-Git log $remoteRef --no-merges "--grep=$MergeCommit" --format=%H
if ($alreadyReverted) {
  Write-Host "Already reverted on $remoteRef by: $($alreadyReverted -join ', '). Nothing to do." -ForegroundColor Green
  exit 0
}

Write-Host ''
Write-Host 'Files the revert will change:'
Invoke-Git diff --stat $MergeCommit $parents[0] | ForEach-Object { Write-Host "  $_" }

# 5. Revert on an up-to-date local main and push. No force push.
Write-Host ''
Write-Host 'Steps:'
Step 'switch to the production branch' @('checkout', $Branch)
Step 'bring local main up to date (fast-forward only)' @('merge', '--ff-only', $remoteRef)
Step 'add a commit that undoes the merge, keeping history' @('revert', '-m', '1', '--no-edit', $MergeCommit)
Step 'publish; Vercel redeploys main' @('push', $Remote, $Branch)

Write-Host ''
if ($DryRun) {
  Write-Host 'Dry run complete. Run again without -DryRun to roll back.' -ForegroundColor Yellow
} else {
  $newHead = (Invoke-Git rev-parse HEAD | Select-Object -First 1).Trim()
  Write-Host "Rolled back. New $Branch head: $newHead" -ForegroundColor Green
  Write-Host 'Vercel will redeploy main in a minute or two. To undo this rollback later:'
  Write-Host "  git revert --no-edit $newHead; git push $Remote $Branch"
}
