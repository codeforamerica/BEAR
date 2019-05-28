// @flow
import React, { Component } from 'react';
import DojFileInput from './DojFileInput';
import ContinueButton from './ContinueButton';
import DojFileItem from './DojFileItem';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

type Props = {
  currentScreen: number,
  dojFilePath: string,
  updateFilePath: string => void
};

const screenNumber = 2;

export default class DojFileSelectFormCard extends Component<Props> {
  renderContinueButton = () => {
    const { dojFilePath } = this.props;
    if (dojFilePath !== '') {
      return <ContinueButton onContinue={() => {}} />;
    }
  };

  renderCardContent = () => {
    const { dojFilePath, updateFilePath } = this.props;
    if (dojFilePath !== '') {
      return (
        <DojFileItem filePath={dojFilePath} onFileRemove={updateFilePath} />
      );
    }

    return <DojFileInput onFileSelect={updateFilePath} />;
  };

  render() {
    const { currentScreen } = this.props;
    return (
      <FormCard currentScreen={currentScreen} screenNumber={screenNumber}>
        <FormCardHeader>Upload .dat file</FormCardHeader>
        <FormCardContent>{this.renderCardContent()}</FormCardContent>
        <FormCardFooter>{this.renderContinueButton()}</FormCardFooter>
      </FormCard>
    );
  }
}
