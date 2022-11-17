# mlr3 actions

GitHub actions and workflows for the packages of the mlr3 ecosystem.

## actions 
### renv-system-dependencies action

This javascript action installs system dependencies of packages recorded in a [renv.lock](https://rstudio.github.io/renv/articles/renv.html) file. Package dependencies are queried from [RSPM](https://github.com/rstudio/r-system-requirements). Inspired by [`remotes::system_requirements()`](https://github.com/r-lib/remotes) function.

## workflows

### r-cmd-check

This workflow runs R CMD check via the `rcmdcheck` package on the latest and devel R version.
Workflow by [r-lib/actions](https://github.com/r-lib/actions).

### dev-cmd-check

This workflow installs the dev version of an mlr3 package and runs R CMD check.
For example, checks `mlr3tuning` with the dev version of `bbotk`.

### pkgdown

This workflow builds a `pkgdown` site and pushes it to gh pages,
Workflow by [r-lib/actions](https://github.com/r-lib/actions).


