// @flow
import React, { Component } from 'react';
import { spawn } from 'child_process';
import path from 'os';
import styles from './Home.css';

export default class Counter extends Component<Props> {
  constructor(props) {
    let gogenPath;
    const home = process.env.HOME;
    if (process.env.NODE_ENV === 'development') {
      gogenPath = `${home}/go/bin/gogen`;
    } else {
      gogenPath = `${process.resourcesPath}${path.sep}gogen`;
    }
    super(props);

    this.state = {
      gogenPath,
      selectedCountyCode: 'SACRAMENTO',
      dojFilePath: `${home}/go/src/gogen/test_fixtures/sacramento/cadoj_sacramento.csv`,
      outputFilePath: `${home}/Desktop`
    };
  }

  runScript = () => {
    console.log(process.env.NODE_ENV);
    const {
      dojFilePath,
      outputFilePath,
      selectedCountyCode,
      gogenPath
    } = this.state;
    const goProcess = spawn(gogenPath, [
      `--input-doj=${dojFilePath}`,
      `--outputs=${outputFilePath}`,
      `--county="${selectedCountyCode}"`
    ]);

    goProcess.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    goProcess.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
    });

    goProcess.on('close', code => {
      console.log(`child process exited with code ${code}`);
    });
  };

  render() {
    return (
      <div>
        <button
          className={styles.btn}
          onClick={this.runScript}
          data-tclass="btn"
          type="button"
        >
          RUN
        </button>
      </div>
    );
  }
}
