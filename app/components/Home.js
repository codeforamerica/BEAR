// @flow
import React, { Component } from 'react';
import path from 'path';
import CountySelectFormCard from './CountySelectFormCard';
import DojFileSelectFormCard from './DojFileSelectFormCard';
import PageContainer from './PageContainer';
import EligibilityOptionsFormCard from './EligibilityOptionsFormCard';
import ProcessingFormCard from './ProcessingFormCard';

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
      currentScreen: 0,
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

  updateEligibilityOptions = (codeSection: string, option: string) => {
    const { baselineEligibilityOptions } = this.state;
    const newOption = {};
    newOption[codeSection] = option;

    const newEligibilityOptions = {
      ...baselineEligibilityOptions,
      ...newOption
    };

    this.setState({ baselineEligibilityOptions: newEligibilityOptions });
  };

  nextScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen + 1 });
  };

  previousScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen - 1 });
  };

  render() {
    const {
      currentScreen,
      county,
      dojFilePath,
      baselineEligibilityOptions
    } = this.state;
    return (
      <PageContainer currentScreen={currentScreen}>
        <CountySelectFormCard
          selectedCounty={county}
          onCountySelect={this.updateCounty}
          onCountyConfirm={this.nextScreen}
        />
        <DojFileSelectFormCard
          countyName={county.name}
          updateFilePath={this.updateFilePath}
          dojFilePath={dojFilePath}
          onFileConfirm={this.nextScreen}
          onBack={this.previousScreen}
        />
        <EligibilityOptionsFormCard
          eligibilityOptions={baselineEligibilityOptions}
          onEligibilityOptionSelect={this.updateEligibilityOptions}
          onOptionsConfirm={this.nextScreen}
          onBack={this.previousScreen}
        />
        <ProcessingFormCard currentScreen={currentScreen} />
      </PageContainer>
    );
  }
}
