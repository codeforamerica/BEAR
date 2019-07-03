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
  onStartOver: void => void,
  resetOutputPath: void => void
};

export default class ProcessingFormCard extends Component<Props> {
  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  render() {
    const { dojFilePath, onComplete } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Reading and preparing your files ...</FormCardHeader>
        <FormCardContent>
          <ProgressBar
            range={getFileSize(dojFilePath)}
            onComplete={onComplete}
          />
        </FormCardContent>
        <FormCardFooter>
          <StartOverButton onStartOver={this.onClickStartOver} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
