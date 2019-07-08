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
  onComplete: void => void,
  runScript: ((void) => void) => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

type State = {
  gogenComplete: boolean
};

export default class ProcessingFormCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gogenComplete: false
    };
  }

  componentDidMount() {
    const { runScript } = this.props;
    runScript(this.onGogenComplete);
  }

  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  onGogenComplete = () => {
    this.setState({ gogenComplete: true });
  };

  render() {
    const { dojFilePath, onComplete } = this.props;
    const { gogenComplete } = this.state;
    return (
      <FormCard>
        <FormCardHeader>Reading and preparing your files ...</FormCardHeader>
        <FormCardContent>
          <ProgressBar
            fileSizeInBytes={getFileSize(dojFilePath)}
            onCompleteCallback={onComplete}
            isComplete={gogenComplete}
          />
        </FormCardContent>
        <FormCardFooter>
          <StartOverButton onStartOver={this.onClickStartOver} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
