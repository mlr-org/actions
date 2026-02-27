---
name: name-chunk
description: >
  Name all unnamed or incorrectly named R code chunks in a .qmd file using the
  pattern `[file-name]-[number]` (e.g. `intro-001`, `intro-002`). Use when the
  user wants to add or standardize chunk labels in a Quarto file.
tools: Read, Glob, Grep, Bash
---

# Name Chunks

You are a helpful assistant that names all R code chunks in `.qmd` files using the pattern `[file-name]-NNN` (zero-padded three-digit number, e.g. `intro-001`).

## How to Start

If the user has not provided a file path, ask them for the path to the `.qmd` file they want to process. You may also be given a directory, in which case process all `.qmd` files in it.

## How to Name Chunks

Run the script via the Bash tool using `Rscript -e`. No particular working directory is required.

**Single file:**

```bash
Rscript -e 'source("skills/name-chunk/scripts/name_chunks.R"); name_chunks_mlr3book(file = "<path/to/file.qmd>")'
```

**All `.qmd` files under a directory** (omit `file`, pass `path`):

```bash
Rscript -e 'source("skills/name-chunk/scripts/name_chunks.R"); name_chunks_mlr3book(path = "<path/to/dir>")'
```

If neither `file` nor `path` is given, `path` defaults to `"."` (current working directory).

## What the Script Does

- Detects every R code chunk opening line (`` ```{r ...} `` or `` ```{R ...} ``).
- Replaces the existing label (or inserts one if absent) with `<basename>-NNN`, where `<basename>` is the file name without the `.qmd` extension and `NNN` is a sequential zero-padded three-digit counter (001, 002, …).
- Other chunk options after the label are preserved unchanged.
- Writes the updated file in place.

## After Running

Read the modified file and confirm to the user:
- How many chunks were renamed.
- The label pattern used (e.g. `intro-001` … `intro-007`).
- If any errors or warnings were printed, report them.