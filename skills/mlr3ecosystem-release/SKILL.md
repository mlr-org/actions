---
name: mlr3ecosystem-release
description: >
  Prepare a CRAN release of packages in the mlr3 ecosystem.
tools: Read, Edit, Glob, Grep, Bash, Write, AskUserQuestion
---

# mlr3ecosystem-release

Your role is to prepare a CRAN release of packages in the mlr3 ecosystem.

## Workflow


### Step 1: Validation

First, check that the prerequisites are available (in this order for
efficiency):

1. Check that the working directory contains a file called `DESCRIPTION`. If
   not, inform the user that this must be run from an R package root directory
   and stop.
2. Use `Rscript -e 'utils::packageVersion("usethis")'` to check if the `usethis`
   package is installed. If not, instruct the user to install it with
   `install.packages("usethis")`, then stop.
3. Determine the GitHub URL for the repository. Try `gh repo view --json url`.
   If that fails, diagnose the error:
   - If `gh` is not installed, try `git remote -v` to find a GitHub URL.
   - If `gh` is installed but not authenticated, suggest running `gh auth login`.
   - If no GitHub remote is found, warn the user that the GitHub release issue
     and pull request steps will be skipped.

### Step 2: Initialization

Next, you need to determine the current package's name and version. Read the
`DESCRIPTION` file and extract the `Version:` and `Package:` fields from it.

Then, check if a `NEWS.md` file exists. If it does, read the first section
(typically the most recent unreleased changes) to understand what kind of
changes have been made. Use this to suggest an appropriate release type:

- If the NEWS mentions "breaking changes", "breaking", "BREAKING", or similar
  language, suggest a **Major** release.
- If the NEWS mentions only "bug fixes", "fixes", "patch", or similar language
  with no new features, suggest a **Patch** release.
- Otherwise (new features, improvements, enhancements), suggest a **Minor**
  release.

Display the current version to the user and ask them what type of release this
should be using the AskUserQuestion tool. Make the suggested release type the
first option with "(Recommended)" appended to the label:

Question: "What type of release is this?"
Header: "Release type"
Options (with recommended option first):
- Major (X.0.0) - Breaking changes (add "(Recommended)" if suggested)
- Minor (x.X.0) - New features but without breaking changes (add "(Recommended)" if suggested)
- Patch (x.x.X) - Bug fixes only (add "(Recommended)" if suggested)

Calculate the new version by manipulating the current version according to the
user's answer. For example:

- Current version `1.2.3` + Major release → `2.0.0`
- Current version `1.2.3` + Minor release → `1.3.0`
- Current version `1.2.3` + Patch release → `1.2.4`
- Current version `0.2.1.9000` + Patch release → `0.2.2`
- Current version `0.2.1.9003` + Minor release → `0.3.0`

Note: If the current version ends in `.9xxx` (R-style development versions),
strip that suffix before calculating the new version.

Display: "Preparing release checklist for ${PACKAGE_NAME} ${CURRENT_VERSION} → ${NEW_VERSION}".

### Step 3: Create a new release branch

Check whether a branch named `release` already exists (locally or on the
remote). If it does, ask the user using AskUserQuestion:

Question: "A 'release' branch already exists. How should we proceed?"
Header: "Existing branch"
Options:
- Delete it and create a fresh one from main
- Abort and let me handle it manually

If the user chooses to delete it, run:

```bash
git branch -D release
git push origin --delete release 2>/dev/null || true
```

Then create a new branch from `main`:

```bash
git checkout main
git pull origin main
git checkout -b release
```

### Step 4: Create a GitHub release issue

If `gh` is available and authenticated, run the following R command to create a
GitHub release issue:

```bash
Rscript -e 'usethis::use_release_issue(version = "${NEW_VERSION}")'
```

After the command succeeds, retrieve the issue number that was just created:

```bash
gh issue list --limit 1 --json number --jq '.[0].number'
```

Store this as `${ISSUE_ID}` for use in Step 6.

If `gh` is not available, skip this step and inform the user that they can
create the release issue manually later. In that case, `${ISSUE_ID}` will be
unknown.

### Step 5: Increase the version number

Run the following R command to update the version in `DESCRIPTION` and `NEWS.md`:

```bash
Rscript -e 'usethis::use_version(which = "major")'
```

Replace `"major"` with `"minor"` or `"patch"` depending on the release type
chosen in Step 2.

### Step 6: Push to GitHub and open a pull request

Commit the changes with the message `release: ${NEW_VERSION}`:

```bash
git add DESCRIPTION NEWS.md
git commit -m "release: ${NEW_VERSION}"
```

Push the branch and open a pull request:

```bash
git push -u origin release
gh pr create \
  --title "release: ${NEW_VERSION}" \
  --body "Closes #${ISSUE_ID}" \
  --base main \
  --head release
```

If `${ISSUE_ID}` is unknown (because Step 4 was skipped), omit the `--body`
flag and add it manually after the PR is created.

Show the user the pull request URL on success.

If `gh` is not available, display the branch name and instruct the user to
open a pull request manually on GitHub.

Inform the user that they should now perform a reverse dependency check, fix any issues found,
and submit the release to CRAN. Wait until the user confirms that the release has
been accepted by CRAN before proceeding to Step 7.

### Step 7: Merge the pull request

Merge the pull request and checkout the main branch:

```bash
gh pr merge --squash --delete-branch release
git checkout main
git pull origin main
```

### Step 8: Add a GitHub release

Run the following R command to create a GitHub release from the version tag:

```bash
Rscript -e 'usethis::use_github_release()'
```

### Step 9: Push dev version to GitHub

Run the following R command to bump the version to a development version:

```bash
Rscript -e 'usethis::use_dev_version(push = FALSE)'
```

Commit and push the changes:

```bash
git add DESCRIPTION NEWS.md
git commit -m "release: ${NEW_VERSION}.9000"
git push origin main
```

The workflow is now complete. Inform the user that the release of `${PACKAGE_NAME} ${NEW_VERSION}` is done.

