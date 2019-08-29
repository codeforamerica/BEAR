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
import { getDateTime } from '../utils/fileUtils';
import ProcessingFormCard from './ProcessingFormCard';
import PrivacyPolicyFormCard from './PrivacyPolicyFormCard';
import TermsOfServiceFormCard from './TermsOfServiceFormCard';
import FaqFormCard from './FaqFormCard';
import ErrorFormCard from './ErrorFormCard';
import nonLinearScreenNumbers from '../constants/nonLinearScreenNumbers';

type State = {
  gogenPath: string,
  formattedGogenRunTime: string,
  currentScreen: number,
  previousScreenInFlow: number,
  county: County,
  dojFilePaths: Array<string>,
  baselineEligibilityOptions: BaselineEligibilityOptions,
  additionalReliefOptions: AdditionalReliefOptions,
  impactStatistics: ImpactStatistics,
  outputPathPrefix: string,
  outputFilePath: string,
  errorText: string
};

type Props = {
  preserveEligibilityConfig: boolean,
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
      formattedGogenRunTime: '',
      outputPathPrefix: `${home}/Desktop/Clear_My_Record_output/CMR_output`,
      outputFilePath: '',
      dojFilePaths: [],
      ...defaultAnalysisOptions
    };
  }

  updateCounty = (county: County) => {
    this.setState({ county });
  };

  updateFilePath = (dojFilePath: string) => {
    const { dojFilePaths } = this.state;
    const updatedFilePath = dojFilePaths;
    if (!dojFilePaths.includes(dojFilePath)) {
      updatedFilePath.push(dojFilePath);
      this.setState({ dojFilePaths: updatedFilePath });
    }
  };

  removeFilePath = (removedFilePath: string) => {
    const { dojFilePaths } = this.state;
    const newPathsArray = dojFilePaths.filter(
      dojFilePath => dojFilePath !== removedFilePath
    );
    this.setState({ dojFilePaths: newPathsArray });
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

  updateImpactStatistics = (gogenImpactStats: Object) => {
    const updatedStats = {
      noFelony: gogenImpactStats.CountSubjectsNoFelony,
      noConvictionLast7: gogenImpactStats.CountSubjectsNoConvictionLast7Years,
      noConviction: gogenImpactStats.CountSubjectsNoConviction
    };

    this.setState({ impactStatistics: updatedStats });
  };

  updateDateForPath = () => {
    const { outputPathPrefix } = this.state;

    const date = getDateTime(new Date());
    const newOutputFilePath = `${outputPathPrefix}_${date}`;

    this.setState({
      formattedGogenRunTime: date,
      outputFilePath: newOutputFilePath
    });
  };

  goToScreen = (screenNumber: number) => {
    const { currentScreen } = this.state;
    const screenIsOutsideFlow = Object.values(nonLinearScreenNumbers).includes(
      currentScreen
    );
    if (screenIsOutsideFlow) {
      this.setState({
        currentScreen: screenNumber
      });
    } else {
      this.setState({
        currentScreen: screenNumber,
        previousScreenInFlow: currentScreen
      });
    }
  };

  goToPreviousScreenInFlow = () => {
    const { previousScreenInFlow } = this.state;
    this.goToScreen(previousScreenInFlow);
  };

  nextScreenInFlow = () => {
    const { currentScreen } = this.state;
    this.goToScreen(currentScreen + 1);
  };

  processingNextScreen = (code: number, errorText: string) => {
    if (code === 0) {
      this.nextScreenInFlow();
    } else {
      this.setState({
        currentScreen: nonLinearScreenNumbers.errorScreen,
        errorText
      });
    }
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
      this.nextScreenInFlow();
    }
  };

  previousScreenInFlow = () => {
    const { currentScreen } = this.state;
    this.goToScreen(currentScreen - 1);
  };

  resetInitialState = () => {
    this.setState({
      ...defaultAnalysisOptions,
      dojFilePaths: [],
      outputFilePath: ''
    });
  };

  runScriptInOptions = (callbackFunction: function) => {
    const { spawnChildProcess, preserveEligibilityConfig } = this.props;
    runScript(
      this.state,
      spawnChildProcess,
      callbackFunction,
      this.updateImpactStatistics,
      preserveEligibilityConfig
    );
  };

  render() {
    const {
      currentScreen,
      county,
      dojFilePaths,
      outputFilePath,
      baselineEligibilityOptions,
      additionalReliefOptions,
      errorText,
      impactStatistics
    } = this.state;
    return (
      <PageContainer
        currentScreen={currentScreen}
        goToScreen={this.goToScreen}
        onStartOver={this.resetInitialState}
      >
        <IntroductionFormCard
          onBegin={this.nextScreenInFlow}
          goToScreen={this.goToScreen}
        />
        <CountySelectFormCard
          selectedCounty={county}
          onCountySelect={this.updateCounty}
          onCountyConfirm={this.nextScreenInFlow}
        />
        <DojFileSelectFormCard
          countyName={county.name}
          updateFilePath={this.updateFilePath}
          dojFilePaths={dojFilePaths}
          onFileConfirm={this.nextScreenInFlow}
          onFileRemove={this.removeFilePath}
          onBack={this.previousScreenInFlow}
        />
        <EligibilityOptionsFormCard
          baselineEligibilityOptions={baselineEligibilityOptions}
          onEligibilityOptionSelect={this.updateStateWithEligibilityOptions}
          onOptionsConfirm={this.eligibilityOptionsNextScreen}
          updateDate={this.updateDateForPath}
          onBack={this.previousScreenInFlow}
          isAllDismiss={this.isAllDismiss()}
        />
        <AdditionalReliefFormCard
          additionalReliefOptions={additionalReliefOptions}
          onReliefOptionSelect={this.updateAdditionalReliefOptions}
          updateDate={this.updateDateForPath}
          onOptionsConfirm={this.nextScreenInFlow}
          onBack={this.previousScreenInFlow}
        />
        <ProcessingFormCard
          dojFilePaths={dojFilePaths}
          onComplete={this.processingNextScreen}
          runScriptInOptions={this.runScriptInOptions}
          onStartOver={this.resetInitialState}
        />
        <ResultsFormCard
          county={county}
          outputFolder={outputFilePath}
          impactStatistics={impactStatistics}
          openFolder={openFolder}
          onStartOver={this.resetInitialState}
        />
        <PrivacyPolicyFormCard onBack={this.goToPreviousScreenInFlow} />
        <FaqFormCard onBack={this.goToPreviousScreenInFlow} />
        <ErrorFormCard
          onStartOver={this.resetInitialState}
          errorText={errorText}
        />
        <TermsOfServiceFormCard onBack={this.goToPreviousScreenInFlow} />
      </PageContainer>
    );
  }
}
