<#
.SYNOPSIS
  Restore the site on main to the tag pre-sdt-2026-10-30, the version before the
  self-determination theory additions (branch 2030-sdt).

.DESCRIPTION
  pre-sdt-2026-10-30 points at b795c383f917d28c4ef4ae50ccd5e20eac7db8f7 ("Merge rename to
  Summit's Next Step"). The same commit is on the branch backup/pre-sdt-2026-10-30.

  The script adds one new commit on top of main whose files exactly match the tag, then
  pushes it. It works however the 2030-sdt work reached main (one merge, several merges,
  or direct commits), keeps history, and never force-pushes. Vercel redeploys main after
  the push.

  GitHub refused the tag push from the cloud session, so the tag may not exist on your
  machine. If it is missing, the script recreates it locally from
  origin/backup/pre-sdt-2026-10-30 and checks that it is the expected commit.

  Run it from anywhere inside a clone of the repository, on a machine whose git is signed
  in to GitHub with push access. Use -DryRun first: it fetches, checks everything, lists
  the files that would change, and prints the exact commands, without changing the working
  tree or pushing.

  ALTERNATIVE: Vercel Instant Rollback. In the Vercel dashboard, open Deployments, find the
  production deployment built from b795c38, and choose "Promote to Production". That
  switches production without touching git; the next push to main redeploys main, so
  follow up with this script if the rollback should stick.

.PARAMETER DryRun
  Print what would happen without changing anything.

.PARAMETER Tag
  The tag to restore. Default: pre-sdt-2026-10-30.

.PARAMETER Remote
  Git remote name. Default: origin.

.PARAMETER Branch
  Branch Vercel deploys to production. Default: main.

.EXAMPLE
  .\scripts\rollback-sdt.ps1 -DryRun

.EXAMPLE
  .\scripts\rollback-sdt.ps1
#>
[CmdletBinding()]
param(
  [switch]$DryRun,
  [string]$Tag = 'pre-sdt-2026-10-30',
  [string]$Remote = 'origin',
  [string]$Branch = 'main'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$ExpectedCommit = 'b795c383f917d28c4ef4ae50ccd5e20eac7db8f7'
$BackupBranch = 'backup/pre-sdt-2026-10-30'

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

function Test-GitRef {
  param([string]$Ref)
  $previous = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    & git rev-parse --verify --quiet "$Ref^{commit}" 2>&1 | Out-Null
    return ($LASTEXITCODE -eq 0)
  } finally {
    $ErrorActionPreference = $previous
  }
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

# 1. Working tree must be clean so the restore commit contains only the rollback.
$dirty = Invoke-Git status --porcelain
if ($dirty) {
  throw "Working tree has uncommitted changes. Commit or stash them first:`n$($dirty -join "`n")"
}

# 2. Fetch main, plus the tag and backup branch if they exist on the remote.
Write-Host "Fetching $Remote ..."
Invoke-Git fetch $Remote $Branch | Out-Null
$previous = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
& git fetch $Remote "refs/tags/${Tag}:refs/tags/$Tag" 2>&1 | Out-Null
& git fetch $Remote "${BackupBranch}:refs/remotes/$Remote/$BackupBranch" 2>&1 | Out-Null
$ErrorActionPreference = $previous
$remoteRef = "$Remote/$Branch"

# 3. Resolve the target: the tag, or the backup branch if the tag is missing.
if (Test-GitRef $Tag) {
  $target = (Invoke-Git rev-parse "$Tag^{commit}" | Select-Object -First 1).Trim()
  Write-Host "Using tag $Tag"
} elseif (Test-GitRef "$Remote/$BackupBranch") {
  $target = (Invoke-Git rev-parse "$Remote/$BackupBranch^{commit}" | Select-Object -First 1).Trim()
  Write-Host "Tag $Tag not found; using $Remote/$BackupBranch"
  Step "recreate the tag locally" @('tag', '-a', $Tag, $target, '-m', 'Site before the self-determination theory additions')
} elseif (Test-GitRef $ExpectedCommit) {
  $target = $ExpectedCommit
  Write-Host "Tag and backup branch not found; using commit $ExpectedCommit"
} else {
  throw "Cannot find $Tag, $Remote/$BackupBranch, or commit $ExpectedCommit."
}
if ($target -ne $ExpectedCommit) {
  throw "$Tag resolves to $target, expected $ExpectedCommit. Check the tag before restoring."
}

Write-Host ''
Write-Host "Restore target: $target"
Write-Host "  subject: $(Invoke-Git log -1 --format=%s $target | Select-Object -First 1)"

# 4. Nothing to do if main already matches the target.
$changes = Invoke-Git diff --stat $remoteRef $target
if (-not $changes) {
  Write-Host "$remoteRef already matches $Tag. Nothing to do." -ForegroundColor Green
  exit 0
}
Write-Host ''
Write-Host "Files the restore will change on ${Branch}:"
$changes | ForEach-Object { Write-Host "  $_" }

# 5. Commit a tree identical to the target on top of main, then push. No force push.
Write-Host ''
Write-Host 'Steps:'
Step 'switch to the production branch' @('checkout', $Branch)
Step 'bring local main up to date (fast-forward only)' @('merge', '--ff-only', $remoteRef)
Step 'make every tracked file match the tag (adds, edits and deletions)' @('restore', "--source=$target", '--staged', '--worktree', '--', ':/')
Step 'record the rollback as one commit' @('commit', '-m', "Roll back to $Tag ($($target.Substring(0, 7)))")
Step 'publish; Vercel redeploys main' @('push', $Remote, $Branch)

Write-Host ''
if ($DryRun) {
  Write-Host 'Dry run complete. Run again without -DryRun to roll back.' -ForegroundColor Yellow
} else {
  $leftover = Invoke-Git diff --stat HEAD $target
  if ($leftover) { throw "Restore incomplete; HEAD still differs from ${target}:`n$($leftover -join "`n")" }
  $newHead = (Invoke-Git rev-parse HEAD | Select-Object -First 1).Trim()
  Write-Host "Rolled back. New $Branch head: $newHead" -ForegroundColor Green
  Write-Host 'Vercel will redeploy main in a minute or two. To undo this rollback later:'
  Write-Host "  git revert --no-edit $newHead; git push $Remote $Branch"
}
