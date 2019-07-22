// @flow
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import path from 'path';
import CountySelectFormCard from './CountySelectFormCard';
import DojFileSelectFormCard from './DojFileSelectFormCard';
import PageContainer from './PageContainer';
import EligibilityOptionsFormCard from './EligibilityOptionsFormCard';
import ResultsFormCard from './ResultsFormCard';
import AdditionalReliefFormCard from './AdditionalReliefFormCard';
import defaultAnalysisOptions from '../constants/defaultAnalysisOptions';
import IntroductionFormCard from './IntroductionFormCard';
import openFolder from '../utils/osHelpers';
import { runScript } from '../utils/gogenUtils';
import { createJsonFile, getDateTime } from '../utils/fileUtils';
import ProcessingFormCard from './ProcessingFormCard';

type State = {
  gogenPath: string,
  dateTime: string,
  currentScreen: number,
  county: County,
  dojFilePath: string,
  baselineEligibilityOptions: BaselineEligibilityOptions,
  additionalReliefOptions: AdditionalReliefOptions,
  outputPathPrefix: string,
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
      outputPathPrefix: `${home}/Desktop/Clear_My_Record_output/CMR_output`,
      outputFilePath: '',
      ...defaultAnalysisOptions
    };
  }

  updateCounty = (county: County) => {
    this.setState({ county });
  };

  updateFilePath = (dojFilePath: string) => {
    this.setState({ dojFilePath });
  };

  // eslint-disable-next-line flowtype/no-weak-types
  updateAdditionalReliefOptions = (reliefOption: string, value: any) => {
    const { additionalReliefOptions } = this.state;
    const newOption = {};
    newOption[reliefOption] = value;

    const newAdditionalReliefOptions = {
      ...additionalReliefOptions,
      ...newOption
    };

    this.setState({ additionalReliefOptions: newAdditionalReliefOptions });
  };

  updateStateWithEligibilityOptions = (codeSection: string, value: string) => {
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
    const { outputPathPrefix } = this.state;

    const date = getDateTime();
    const newOutputFilePath = `${outputPathPrefix}_${date}`;

    this.setState({
      dateTime: date,
      outputFilePath: newOutputFilePath
    });
  };

  resetOutputPath = () => {
    const { outputPathPrefix } = this.state;
    this.setState({
      outputFilePath: outputPathPrefix
    });
  };

  nextScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen + 1 });
  };

  isAllDismiss = () => {
    const { baselineEligibilityOptions } = this.state;
    return Object.values(baselineEligibilityOptions).every(
      option => option === 'dismiss'
    );
  };

  eligibilityOptionsNextScreen = () => {
    const { currentScreen } = this.state;

    if (this.isAllDismiss()) {
      this.setState({ currentScreen: currentScreen + 2 });
    } else {
      this.nextScreen();
    }
  };

  previousScreen = () => {
    const { currentScreen } = this.state;
    this.setState({ currentScreen: currentScreen - 1 });
  };

  resetInitialState = () => {
    this.setState(defaultAnalysisOptions);
  };

  runScriptInOptions = (callbackFunction: function) => {
    const { spawnChildProcess } = this.props;
    runScript(this.state, spawnChildProcess, createJsonFile, callbackFunction);
  };

  render() {
    const {
      currentScreen,
      county,
      dojFilePath,
      outputFilePath,
      baselineEligibilityOptions,
      additionalReliefOptions
    } = this.state;
    return (
      <PageContainer currentScreen={currentScreen}>
        <IntroductionFormCard onBegin={this.nextScreen} />
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
          onEligibilityOptionSelect={this.updateStateWithEligibilityOptions}
          onOptionsConfirm={this.eligibilityOptionsNextScreen}
          updateDate={this.updateDateForPath}
          onBack={this.previousScreen}
          isAllDismiss={this.isAllDismiss()}
        />
        <AdditionalReliefFormCard
          additionalReliefOptions={additionalReliefOptions}
          onReliefOptionSelect={this.updateAdditionalReliefOptions}
          updateDate={this.updateDateForPath}
          onOptionsConfirm={this.nextScreen}
          onBack={this.previousScreen}
        />
        <ProcessingFormCard
          dojFilePath={dojFilePath}
          outputFilePath={outputFilePath}
          onComplete={this.nextScreen}
          runScriptInOptions={this.runScriptInOptions}
          onStartOver={this.resetInitialState}
          resetOutputPath={this.resetOutputPath}
        />
        <ResultsFormCard
          county={county}
          outputFolder={outputFilePath}
          openFolder={openFolder}
          onStartOver={this.resetInitialState}
          resetOutputPath={this.resetOutputPath}
        />
      </PageContainer>
    );
  }
}
