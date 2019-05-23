// @flow
import React, { Component } from 'react';
import path from 'path';
import CountySelectFormCard from './CountySelectFormCard';
import DojFileSelectFormCard from './DojFileSelectFormCard';
import PageContainer from './PageContainer';

type Props = {
  spawnChildProcess: (
    path: string,
    options: Array<string>
  ) => child_process$ChildProcess // eslint-disable-line camelcase
};

type State = {
  gogenPath: string,
  county: County,
  currentScreen: number,
  dojFilePath: string,
  outputFilePath: string
};

export default class Home extends Component<Props, State> {
  runScript: () => void;

  updateCounty: (county: County) => void;

  updateScreen: (newScreen: number) => void;

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
      county: { name: '', code: '' },
      currentScreen: 1,
      dojFilePath: `${home}/go/src/gogen/test_fixtures/sacramento/cadoj_sacramento.csv`,
      outputFilePath: `${home}/Desktop`
    };

    this.runScript = this.runScript.bind(this);
    this.updateCounty = this.updateCounty.bind(this);
    this.updateScreen = this.updateScreen.bind(this);
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

  updateScreen(newScreen: number) {
    this.setState({ currentScreen: newScreen });
  }

  render() {
    const { currentScreen, county } = this.state;
    return (
      <PageContainer>
        <CountySelectFormCard
          currentScreen={currentScreen}
          onCountySelect={this.updateCounty}
          onCountyConfirm={this.updateScreen}
        />
        <DojFileSelectFormCard
          currentScreen={currentScreen}
          countyName={county.name}
        />
      </PageContainer>
    );
  }
}
