---
name: r-package-setup
description: Creates or bootstraps R packages by applying the shared template files from `package/`, including editor, lint, build, and AI guidance config.` rules copied into a target package.
tools: Read, Edit, Glob, Grep, Bash, Write, AskUserQuestion, WebFetch
---

# R package setup

Set up a new R package the repository's config and setup files from `package/`.

## When to use

Use this skill when the user wants to:

- create a new R package with the repository's standard config
- update the config files in an existing R package from this parent repo

## Required inputs

Before running anything, make sure you know:

- the target package path
- whether existing config files may be overwritten or updated
- ask whether the package is part of the mlr3 ecosystem or not
- ask whether the package should contain C or C++ code 

If either is missing, ask first.

## Workflow

1. Verify that `package/` exists as a subdirectory in this skill folder, and use the files therein.
2. If the target package does not exist yet, create it with `usethis::create_package(path, open = FALSE, rstudio = FALSE)`.
3. If the target directory exists, is non-empty, and does not contain `DESCRIPTION`, stop and ask the user how to proceed.
4. Copy these files from `package/` into the target package:
   - `.gitignore`
   - `.Rbuildignore`
   - `.vscode/settings.json`
   - `.vscode/tasks.json` (if the R package contains C or C++ code)
   - `.cspell/project-words.txt`
   - `.claude/settings.json`
   - `.editorconfig`
   - `.clang-format` (if the R package contains C or C++ code)
   - `.lintr`
   - `air.toml`
   - `AGENTS.md`
   - `cspell.json`
   - `extra-rules/mlr3.md` (if the R package is part of the mlr3 ecosystem)
5. Create a symlink from `AGENTS.md` to `CLAUDE.md` in the target package.
6. If any destination file already exists, only replace it when the user explicitly approved overwriting. Otherwise skip it and report the skip.
7. Read the target package's `AGENTS.md` and follow it for all further work in that package.
8. Report which files were symlinked, copied, overwritten, or skipped.

## Suggested commands

Create a new package from the repository root:

```bash
Rscript -e 'usethis::create_package("<target-package-path>", open = FALSE, rstudio = FALSE)'
```

Create parent directories before linking or copying nested files:

```bash
mkdir -p "<target-package-path>/.vscode"
```

Use `ln -s` for new symlinks. If overwrite was approved, use `ln -sfn`.

Use `cp` for new copied files. If overwrite was approved, use `cp -f`.

## Important rules

- Always ask before replacing existing config.
- Do not change template files in `package/`.
- After setup, treat the target package's `AGENTS.md` as authoritative.

## After setup

When follow-up work is requested inside the target package:

1. Read `<target-package>/AGENTS.md`.
2. Use the commands and conventions documented there.
3. Reuse the shared config files rather than introducing alternate tooling or style rules.
