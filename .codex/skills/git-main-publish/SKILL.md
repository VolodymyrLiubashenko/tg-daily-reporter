---
name: git-main-publish
description: Commit current repository changes and push them to the main branch. Use when the user asks Codex to make a git commit, publish changes, push to GitHub/origin, deploy committed work through git, or specifically commit and push to main/master.
---

# Git Main Publish

## Workflow

Use this skill to turn the current working tree into a normal git commit on `main` and push it to `origin/main`.

1. Inspect the repository state.
   - Run `git status --short` and `git branch --show-current`.
   - Review changed files with `git diff --stat` and, when needed, targeted `git diff -- <path>`.
   - Identify files created or changed by Codex during the current task versus unrelated user changes.

2. Protect unrelated work.
   - Do not revert, reset, discard, or overwrite user changes.
   - Do not stage unrelated files unless the user explicitly asked to publish all current changes.
   - If unrelated changes are mixed in the same file as Codex changes, inspect the diff carefully and stage only the intended hunks when possible.

3. Verify before committing.
   - Prefer the repository's documented checks for the changed area.
   - For this repository, backend checks commonly include `npm run typecheck` or `npm run build` from the repo root.
   - For `frontApp/` changes, run at least `npm run typecheck` and `npm run lint` from `frontApp/` when practical.
   - If checks cannot run because dependencies are missing, network is blocked, or the command fails for pre-existing unrelated reasons, report that clearly before committing.

4. Prepare the commit.
   - Use `git status --short` immediately before staging.
   - Stage only intended files or hunks with `git add <path>` or `git add -p`.
   - Create a concise imperative commit message, for example `Add git main publish skill`.
   - If the user gave a commit message, use it unless it is empty or misleading.

5. Ensure the target branch is `main`.
   - If already on `main`, commit there.
   - If on another branch and the user explicitly requested pushing to `main`, ask before switching if there are unstaged changes that would make switching risky.
   - If switching is safe, use `git switch main`.
   - Do not force-push.

6. Push.
   - Push with `git push origin main`.
   - If push fails because network or credentials require escalation, rerun with `sandbox_permissions: "require_escalated"` and a short justification asking the user to allow the push.
   - If the remote rejects because local `main` is behind, do not force. Fetch/rebase or merge only after explaining the situation and choosing the safest path for the repository.

7. Report the result.
   - Include the commit hash from `git rev-parse --short HEAD`.
   - Mention the branch and remote pushed.
   - Mention checks run and their status.
   - If anything was intentionally left uncommitted, list it briefly.

## Safety Rules

- Never run `git reset --hard`, `git clean`, `git checkout -- <path>`, or force push unless the user explicitly requested that exact destructive action.
- Never commit secrets, `.env` files, production tokens, local caches, or generated dependency folders.
- If `git status` shows suspicious files, pause and inspect before staging.
- Prefer non-interactive git commands. Avoid workflows that open an editor.
