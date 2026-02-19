# mlr3 ecosystem

GitHub actions, workflows, Claude Code skills, and R package helper files for the mlr3 ecosystem.

## Workflows

- **r-cmd-check** – Runs R CMD check via the `rcmdcheck` package on the latest and devel R version. Workflow by [r-lib/actions](https://github.com/r-lib/actions).
- **dev-cmd-check** – Installs the dev version of an mlr3 package and runs R CMD check. For example, checks `mlr3tuning` with the dev version of `bbotk`.
- **pkgdown** – Builds a `pkgdown` site and pushes it to gh pages. Workflow by [r-lib/actions](https://github.com/r-lib/actions).
- **no-suggest-cmd-check** – Runs R CMD check via the `rcmdcheck` package on the latest and devel R version without suggested packages. Workflow by [r-lib/actions](https://github.com/r-lib/actions).
- **revdep-check** – Checks the reverse dependencies of an mlr3 package. For example, checks `mlr3tuning` with the dev version of `bbotk`.
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

## Package

Helper files for R package development in the mlr3 ecosystem.

- **.editorconfig** – Editor configuration for consistent coding styles.
- **.clangd** – Clangd configuration.
- **.lintr** – Linting configuration for R code.

