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
    super(props);

    let gogenPath;

    let home: string;
    let isPackaged: string;

    if (process.env.HOME != null) {
      home = process.env.HOME;
    } else {
      home = '';
      throw new Error('Home directory is null');
    }
    if (process.env.IS_PACKAGED != null) {
      isPackaged = process.env.IS_PACKAGED;
    } else {
      isPackaged = '';
      throw new Error('IS_PACKAGED is null');
    }

    if (isPackaged !== 'false') {
      gogenPath = `${process.resourcesPath}${path.sep}gogen`;
    } else {
      gogenPath = `${home}/go/bin/gogen`;
    }

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
