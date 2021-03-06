# B.E.A.R. (Bulk Expungement Analysis of Records)

🚫 **This repository has been archived**

B.E.A.R. (Bulk Expungement Analysis of Records) was an application created by the Clear My Record team at Code for America in 2019 to support the state of California’s implementation of H&S § 11361.9 (marijuana conviction relief).

Since the deadline for the use case of this application by government was July 2020, the Clear My Record team discontinued maintenance of the application in September 2020.

**Please see below for more background on the project, and please reach out to clearmyrecord@codeforamerica.org for questions.**

## The Application

This app provides a desktop GUI for a Golang script that takes in California Department of Justice .dat files containing criminal histories and identifies convictions that are eligible for relief under California's Proposition 64.
The app can be packaged for installation on Windows, Mac, or Linux.

The companion Golang project can be found [here](https://github.com/codeforamerica/gogen).

## About

This application was developed by Code for America's [Clear My Record team](https://www.codeforamerica.org/programs/clear-my-record).

For more information about Clear My Record and how you might use this tool, visit our [H&S§11361.9 Implementation Toolkit](https://www.codeforamerica.org/programs/clear-my-record).

## Install

First, clone the repo via git:

```bash
$ git clone git@github.com:codeforamerica/bear.git
```

And then install the dependencies with yarn.

```bash
$ cd BEAR
$ yarn
```

## Acquiring and Updating your Gogen Binary

In order to work in development mode, this application expects an executable binary at `~/go/bin/gogen`. This binary IS NOT INCLUDED IN THE COMMITTED FILES.
The binary is generated by a separate repo that can be found [here](https://github.com/codeforamerica/gogen).
To build the binary and place a copy where the development mode of BEAR expects it, follow the instructions for cloning and installing in the gogen README, then:

```
$ cd ~/go/src/gogen
$ go build
$ cp gogen ~/go/bin/gogen
```

You must repeat this process any time you make changes to the gogen code, if you want to see those changes reflected when running BEAR in development mode.
For information about how to include the gogen binary when packaging BEAR for production, see the section on releasing.

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Testing

To run the unit tests:

```bash
$ yarn test
```

To run the main end-to-end tests:

```bash
$ yarn build-e2e
$ yarn test-e2e
```

There are a few end-to-end tests that fail on some development machines for mysterious reasons. To run the CI-only end-to-end tests:

```bash
$ yarn build-e2e
$ yarn test-ci-e2e
```

To run all tests (except CI-only) including the linter and the Flow type-checker:

```bash
$ yarn test-all
```

To update the test snapshots when you have made intentional changes to the UI:

```bash
$ yarn test-update-snapshots
```

## Releasing a New Version of BEAR

We create and publish built executables using [electron-builder](https://github.com/electron-userland/electron-builder).

BEAR is automatically packaged and released as a pre-release to Github as part of our CircleCI workflow.

Generating open source attributions, publishing the production-ready release on Github, and signing the binary and making it available for public download are manual steps. For instructions on how to do this, [see the BEAR Release Process in Google Drive](https://docs.google.com/document/d/1P4nR7UPCLYFuVVz57geN5z6adkv2y2eA8FyMuoH4f3Q/edit).

### Packaging and Publishing from a Local Machine

We recommend using the CI release process when possible, but if you need to package the app on your local machine, instructions can be found below.

To package the app for Mac:

```bash
$ yarn package-mac
```

To package the app for Windows:

```bash
$ yarn package-win
```

To package the app for Windows and create a draft release on Github (this should only be done as part of a successful CI build):

```bash
$ export GH_TOKEN={your-github-token}
$ yarn package-publish-win
```

To package the app for Mac and create a draft release on Github (this should only be done locally after a successful CI build, and will require you to manually download the correct version of gogen):

```bash
$ export GH_TOKEN={your-github-token}
$ yarn package-publish-mac
```

### Including the gogen binary in the packaged app

When packaging, BEAR expects a copy of the gogen binary to be present in the project root. Keep in mind that the binary must be of the correct type to match the platform you are packaging for.
For example, if you are packaging for Windows you need to make sure there is a gogen.exe binary in the BEAR project root.
It is fine if there are both Mac and Windows binaries in the project root at package time - the app will detect the platform and select the correct binary based on the file extension.
Remember that if your are packaging on your local machine, you need to update the binary manually if you want to capture changes made to gogen.

## Electron-React-Boilerplate

This project was built on top of [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

See their [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Updating the Docker image for CI

We use a Dockerfile on Circle CI to package and publish our binary to Github. It periodically needs updates—here's how to make them:

```bash
$ docker login --username=<username>
// Make updates to Dockerfile
$ docker build .
// View built images and copy the image ID we want to push
$ docker images
$ docker tag <image id> codeforamerica/bear-ci:latest
$ docker push codeforamerica/bear-ci
```

## License

MIT. Please see LICENSE and NOTICES.md.
