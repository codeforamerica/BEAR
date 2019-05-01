// @flow
import React, { Component } from 'react';
import { spawn } from 'child_process';
import path from 'path';
import styles from './Home.css';

type Props = {};
type State = {
  gogenPath: string,
  selectedCountyCode: string,
  dojFilePath: string,
  outputFilePath: string
};

type Process = Process & {
  resourcesPath: string
};

export default class Home extends Component<Props, State> {
  runScript: () => void;

  constructor(props: Props) {
    let gogenPath;

    // const resourcesPath =
    let home: string;
    let isPackaged: string;

    if (process.env.HOME != null) {
      home = process.env.HOME;
    } else {
      home = '';
    }
    if (process.env.IS_PACKAGED != null) {
      isPackaged = process.env.IS_PACKAGED;
    } else {
      isPackaged = '';
    }

    if (isPackaged !== 'false') {
      gogenPath = `${process.resourcesPath}${path.sep}gogen`;
    } else {
      gogenPath = `${home}/go/bin/gogen`;
    }
    super(props);

    this.state = {
      gogenPath,
      selectedCountyCode: 'SACRAMENTO',
      dojFilePath: `${home}/go/src/gogen/test_fixtures/sacramento/cadoj_sacramento.csv`,
      outputFilePath: `${home}/Desktop`
    };

    this.runScript = this.runScript.bind(this);
  }

  runScript() {
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
  }

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
