# README

B.E.A.R. (Bulk Expungement Analysis of Records)

This app provides a desktop GUI for a Golang script that takes in CA Department of Justice .dat files containing criminal histories and identifies convictions that are eligible for relief under CA Prop 64.
The app can be packaged for installation on Windows, Mac, or Linux.

The Golang project can be found [here](https://github.com/codeforamerica/gogen).

<p>
  This project uses <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).
</p>

## Install

First, clone the repo via git:

```bash
$ git clone git@github.com:codeforamerica/bear.git
```

And then install the dependencies with yarn.

```bash
$ cd automated_conviction_relief
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

## Electron-React-Boilerplate

This project was built on top of [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

See their [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## License

TBD
