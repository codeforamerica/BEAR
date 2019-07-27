// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import ProgressBar from './ProgressBar';
import StartOverButton from './StartOverButton';
import { getFileSize } from '../utils/fileUtils';

type Props = {
  dojFilePath: string,
  onComplete: number => void,
  runScriptInOptions: ((number) => void) => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

type State = {
  gogenComplete: boolean,
  gogenExitCode: number
};

export default class ProcessingFormCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gogenComplete: false,
      gogenExitCode: -1
    };
  }

  componentDidMount() {
    const { runScriptInOptions } = this.props;
    runScriptInOptions(this.onGogenComplete);
    window.scrollTo(0, 0);
  }

  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  onGogenComplete = (code: number) => {
    this.setState({ gogenComplete: true, gogenExitCode: code });
  };

  render() {
    const { dojFilePath, onComplete } = this.props;
    const { gogenComplete, gogenExitCode } = this.state;
    return (
      <FormCard>
        <FormCardHeader />
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--woman-detective-medium-dark-skin-tone" />
            <h3>Reading and preparing your files ...</h3>
            <ProgressBar
              fileSizeInBytes={getFileSize(dojFilePath)}
              onCompleteCallback={onComplete}
              isComplete={gogenComplete}
              gogenExitCode={gogenExitCode}
            />
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
