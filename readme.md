# actions

GitHub actions and workflows for the packages of the mlr3 ecosystem.

## renv-system-dependencies action

This javascript action installs system dependencies of packages recorded in a [renv.lock](https://rstudio.github.io/renv/articles/renv.html) file. Package dependencies are queried from [RSPM](https://github.com/rstudio/r-system-requirements). Inspired by [`remotes::system_requirements()`](https://github.com/r-lib/remotes) function.

## check-packages workflow

Default check workflow of mlr3 packages.

