// @flow
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import path from 'path';
import CountySelectFormCard from './CountySelectFormCard';
import DojFileSelectFormCard from './DojFileSelectFormCard';
import PageContainer from './PageContainer';
import EligibilityOptionsFormCard from './EligibilityOptionsFormCard';
import ResultsFormCard from './ResultsFormCard';
import openFolder from '../utils/osHelpers';
import { runScript } from '../utils/gogenUtils';
import { getDateTime } from '../utils/fileUtils';

type State = {
  gogenPath: string,
  dateTime: string,
  currentScreen: number,
  county: County,
  dojFilePath: string,
  baselineEligibilityOptions: BaselineEligibilityOptions,
  initialFilePath: string,
  outputFilePath: string
};

type Props = {
  spawnChildProcess: (
    path: string,
    options: Array<string>
  ) => child_process$ChildProcess // eslint-disable-line camelcase
};

export default class Home extends Component<Props, State> {
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
      dateTime: '',
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
      initialFilePath: `${home}/Desktop/Clear_My_Record_output/CMR_output`,
      outputFilePath: ''
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { dateTime } = this.state;
    if (dateTime !== prevState.dateTime) {
      this.runScriptInOptions();
    }
  }

  updateCounty = (county: County) => {
    this.setState({ county });
  };

  updateFilePath = (dojFilePath: string) => {
    this.setState({ dojFilePath });
  };

  updateStateWithOptions = (codeSection: string, value: string) => {
    const { baselineEligibilityOptions } = this.state;
    const newOption = {};
    newOption[codeSection] = value;

    const newEligibilityOptions = {
      ...baselineEligibilityOptions,
      ...newOption
    };

    this.setState({
      baselineEligibilityOptions: newEligibilityOptions
    });
  };

  updateDateForPath = () => {
    const { initialFilePath } = this.state;

    const date = getDateTime();
    const newOutputFilePath = `${initialFilePath}_${date}`;

    this.setState({
      dateTime: date,
      outputFilePath: newOutputFilePath
    });
  };

  resetOutputPath = () => {
    const { initialFilePath } = this.state;
    this.setState({
      outputFilePath: initialFilePath
    });
  };

  nextScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen + 1 });
  };

  previousScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen - 1 });
  };

  homeScreen = () => {
    this.setState({
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
      }
    });
  };

  runScriptInOptions = () => {
    const { spawnChildProcess } = this.props;
    runScript(this.state, spawnChildProcess);
  };

  render() {
    const {
      currentScreen,
      county,
      dojFilePath,
      outputFilePath,
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
          baselineEligibilityOptions={baselineEligibilityOptions}
          updateDate={this.updateDateForPath}
          onEligibilityOptionSelect={this.updateStateWithOptions}
          onOptionsConfirm={this.nextScreen}
          onBack={this.previousScreen}
        />
        <ResultsFormCard
          county={county}
          outputFolder={outputFilePath}
          openFolder={openFolder}
          onStartOver={this.homeScreen}
          resetOutputPath={this.resetOutputPath}
        />
      </PageContainer>
    );
  }
}
