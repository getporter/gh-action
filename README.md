# Porter Setup Action

This action installs [porter](https://porter.sh) so that it can be used in pipelines  

## Prerequisite

Using Porter's `publish` command requries access to a Docker registry. In order to push bundles and images to this registry, you will need to perform a Docker login. We recommend the [docker-login](https://github.com/marketplace/actions/docker-login) action.
 
## Example usage

name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Setup Porter
      uses: jeremyrickard/porter-gh-action@master
    - name: Run a one-line script
      run: porter version

