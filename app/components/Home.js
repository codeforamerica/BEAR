// @flow
import React, { Component } from 'react';
import path from 'path';
import CountySelectFormCard from './CountySelectFormCard';
import DojFileSelectFormCard from './DojFileSelectFormCard';
import PageContainer from './PageContainer';
import EligibilityOptionsFormCard from './EligibilityOptionsFormCard';

type Props = {
  spawnChildProcess: (
    path: string,
    options: Array<string>
  ) => child_process$ChildProcess // eslint-disable-line camelcase
};

type State = {
  gogenPath: string,
  currentScreen: number,
  county: County,
  dojFilePath: string,
  baselineEligibilityOptions: BaselineEligibilityOptions,
  outputFilePath: string
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
      if (!process.env.IS_PACKAGED) {
        throw new Error('Home directory is null');
      }
    }
    if (process.env.IS_PACKAGED != null) {
      isPackaged = process.env.IS_PACKAGED;
    } else {
      isPackaged = 'false';
    }

    if (isPackaged !== 'false') {
      if (process.env.PLATFORM === 'windows') {
        gogenPath = `${process.resourcesPath}${path.sep}gogen.exe`;
      } else {
        gogenPath = `${process.resourcesPath}${path.sep}gogen`;
      }
    } else {
      gogenPath = `${home}/go/bin/gogen`;
    }

    this.state = {
      gogenPath,
      currentScreen: 1,
      county: { name: '', code: '' },
      dojFilePath: '',
      baselineEligibilityOptions: {
        '11357(a)': 'dismiss',
        '11357(b)': 'dismiss',
        '11357(c)': 'dismiss',
        '11357(d)': 'dismiss',
        '11358': 'dismiss',
        '11359': 'dismiss',
        '11360': 'dismiss'
      },
      outputFilePath: `${home}/Desktop`
    };

    this.runScript = this.runScript.bind(this);
  }

  runScript() {
    const { dojFilePath, county, outputFilePath, gogenPath } = this.state;

    const { spawnChildProcess } = this.props;

    const countyCode = county.code;

    const goProcess = spawnChildProcess(gogenPath, [
      `--input-doj=${dojFilePath}`,
      `--outputs=${outputFilePath}`,
      `--county="${countyCode}"`
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

  updateCounty = (county: County) => {
    this.setState({ county });
  };

  updateFilePath = (dojFilePath: string) => {
    this.setState({ dojFilePath });
  };

  updateScreen = (newScreen: number) => {
    this.setState({ currentScreen: newScreen });
  };

  render() {
    const {
      currentScreen,
      county,
      dojFilePath,
      baselineEligibilityOptions
    } = this.state;
    return (
      <PageContainer>
        <CountySelectFormCard
          selectedCounty={county}
          currentScreen={currentScreen}
          onCountySelect={this.updateCounty}
          onCountyConfirm={this.updateScreen}
        />
        <DojFileSelectFormCard
          currentScreen={currentScreen}
          countyName={county.name}
          updateFilePath={this.updateFilePath}
          dojFilePath={dojFilePath}
          onFileConfirm={this.updateScreen}
        />
        <EligibilityOptionsFormCard
          currentScreen={currentScreen}
          eligibilityOptions={baselineEligibilityOptions}
        />
      </PageContainer>
    );
  }
}
