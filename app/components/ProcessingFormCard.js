// @flow
import React, { Component } from 'react';

import FormCard, { FormCardContent } from './FormCard';
import ProgressBar from './ProgressBar';
import StartOverButton from './StartOverButton';
import { getFileSize } from '../utils/fileUtils';

type Props = {
  dojFilePaths: Array<string>,
  onComplete: (number, string) => void,
  runScriptInOptions: ((number, string) => void) => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

type State = {
  gogenComplete: boolean,
  gogenExitCode: number,
  errorText: string
};

export default class ProcessingFormCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gogenComplete: false,
      gogenExitCode: -1,
      errorText: ''
    };
  }

  componentDidMount() {
    const { runScriptInOptions } = this.props;
    runScriptInOptions(this.onScriptComplete);
    window.scrollTo(0, 0);
  }

  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  onScriptComplete = (code: number, errorText: string) => {
    this.setState({ gogenComplete: true, gogenExitCode: code, errorText });
  };

  calculateFileSizes = () => {
    const { dojFilePaths } = this.props;
    let totalSize = 0;
    dojFilePaths.forEach(path => {
      totalSize += getFileSize(path);
    });
    return totalSize;
  };

  render() {
    const { onComplete } = this.props;
    const { gogenComplete, gogenExitCode, errorText } = this.state;
    return (
      <FormCard>
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--woman-detective-medium-dark-skin-tone" />
            <h3>Reading and preparing files ...</h3>
            <ProgressBar
              fileSizeInBytes={this.calculateFileSizes()}
              onCompleteCallback={onComplete}
              isComplete={gogenComplete}
              gogenExitCode={gogenExitCode}
              errorText={errorText}
            />
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardContent>
      </FormCard>
    );
  }
}
