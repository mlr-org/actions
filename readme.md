# mlr3 actions

GitHub actions and workflows for the packages of the mlr3 ecosystem.

## actions

### quarto-netlify-preview

This composite action deploys previews of rendered quarto sites to [Netlify](https://www.netlify.com/).

## workflows

## r-cmd-check

This workflow runs R CMD check via the `rcmdcheck` package on the latest and devel R version.
Workflow by [r-lib/actions](https://github.com/r-lib/actions).

## dev-cmd-check

This workflow installs the dev version of an mlr3 package and runs R CMD check.
For example, checks `mlr3tuning` with the dev version of `bbotk`.

## pkgdown

This workflow builds a `pkgdown` site and pushes it to gh pages.
Workflow by [r-lib/actions](https://github.com/r-lib/actions).

## no-suggest-cmd-check

This workflow runs R CMD check via the `rcmdcheck` package on the latest and devel R version without suggested packages.
Workflow by [r-lib/actions](https://github.com/r-lib/actions).

## revdep-check

This workflow checks the reverse dependencies of an mlr3 package.
For example, checks `mlr3tuning` with the dev version of `bbotk`.

## Debugging workflows

When triggering the workflows manually, the "tmate debugging" flag can be checked which will allow you to directly
interact with the host system on which the actual scripts (actions) will run.
To continue the action, run `touch continue`.
A more detailed description of this workflow can be found [here](https://github.com/mxschmitt/action-tmate).

Tmate can also be used to debug problems on other machines than ones own, for more information see [this article](https://yihui.org/en/2022/12/gha-debug/).
