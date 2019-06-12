// @flow
import React, { Component } from 'react';
import path from 'path';
// spike!
// import fileSaver from 'fs';
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
  outputFilePath: string,
  jsonPath: string
};

export default class Home extends Component<Props, State> {
  runScript: () => void;
  // spike!
  // eligibilityOptionsString: string;
  //
  // jsonFile: void;

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
        '0': { codeSection: '11357(a)', option: 'dismiss' },
        '1': { codeSection: '11357(b)', option: 'dismiss' },
        '2': { codeSection: '11357(c)', option: 'dismiss' },
        '3': { codeSection: '11357(d)', option: 'dismiss' },
        '4': { codeSection: '11358', option: 'dismiss' },
        '5': { codeSection: '11359', option: 'dismiss' },
        '6': { codeSection: '11360', option: 'dismiss' }
      },
      outputFilePath: `${home}/Desktop`,
      jsonPath: ''
    };
    // spike!
    // this.eligibilityOptionsString = JSON.stringify(
    //   Home.state.baselineEligibilityOptions
    // );
    // this.jsonFile = this.createJsonFile(this.eligibilityOptionsString);
    // Home.state.jsonPath = this.jsonFile;

    this.runScript = this.runScript.bind(this);
  }

  runScript() {
    const {
      dojFilePath,
      county,
      outputFilePath,
      gogenPath,
      jsonPath
    } = this.state;

    const { spawnChildProcess } = this.props;

    const countyCode = county.code;

    const goProcess = spawnChildProcess(gogenPath, [
      `--input-doj=${dojFilePath}`,
      `--outputs=${outputFilePath}`,
      `--county="${countyCode}"`,
      `--jsonPath=${jsonPath}`
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

  updateEligibilityOptions = (key: string, value: string) => {
    const { baselineEligibilityOptions } = this.state;
    const newOption = {};
    newOption[key] = {
      codeSection: baselineEligibilityOptions[key].codeSection,
      option: value
    };

    const newEligibilityOptions = {
      ...baselineEligibilityOptions,
      ...newOption
    };

    this.setState({ baselineEligibilityOptions: newEligibilityOptions });
  };
  // spike!
  // createJsonFile = (jsonData: string) => {
  //   fileSaver.writeFile('eligibility_options.txt', jsonData, function(err) {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  // };

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
