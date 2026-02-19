# mlr3 ecosystem

GitHub actions, workflows, Claude Code skills, and R package helper files for the mlr3 ecosystem.

## Workflows

- **r-cmd-check** – Runs R CMD check via the `rcmdcheck` package on the latest and devel R version. 
Workflow by [r-lib/actions](https://github.com/r-lib/actions).
- **dev-cmd-check** – Checks a package against the dev version of one of its dependencies.
For example, the `mlr3` repository uses this workflow to check whether `mlr3` works with the dev version of `mlr3misc`.
- **revdep-check** – Checks the reverse dependencies of a package against its own dev version.
For example, the `mlr3misc` repository uses this workflow to check whether `mlr3` still works with the dev version of `mlr3misc`.
- **pkgdown** – Builds a `pkgdown` site and pushes it to gh pages. 
Workflow by [r-lib/actions](https://github.com/r-lib/actions).
- **no-suggest-cmd-check** – Runs R CMD check via the `rcmdcheck` package on the latest and devel R version without suggested packages. 
Workflow by [r-lib/actions](https://github.com/r-lib/actions).
- **quarto-netlify-preview** – Deploys previews of rendered quarto sites to [Netlify](https://www.netlify.com/).

When triggering the workflows manually, the "tmate debugging" flag can be checked which will allow you to directly interact with the host system on which the actual scripts (actions) will run.
To continue the action, run `touch continue`.
A more detailed description of this workflow can be found [here](https://github.com/mxschmitt/action-tmate).
Tmate can also be used to debug problems on other machines than ones own, for more information see [this article](https://yihui.org/en/2022/12/gha-debug/).

## Skills

Claude Code skills for working with mlr3 packages.

- **authoring** – Assists with package authoring tasks.
- **cran-extrachecks** – Helps with CRAN extra checks.
- **critical-code-reviewer** – Provides critical code review.
- **describe-design** – Describes the design of a package.
- **pr-create** – Assists with creating pull requests.

Skills from [posit-dev](https://github.com/posit-dev/skills).
See this [help page](https://support.claude.com/en/articles/12512180-using-skills-in-claude) for more information on how to use skills in Claude.

## Package

Helper files for R package development in the mlr3 ecosystem.

- **.editorconfig** – Editor configuration for consistent coding styles.
- **.clangd** – Clangd configuration.
- **.lintr** – Linting configuration for R code.

