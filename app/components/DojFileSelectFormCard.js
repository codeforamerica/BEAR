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
import GoBackButton from './GoBackButton';
import DisabledContinueButton from './DisabledContinueButton';

type Props = {
  dojFilePath: string,
  updateFilePath: string => void,
  onFileConfirm: void => void,
  onBack: void => void
};

export default class DojFileSelectFormCard extends Component<Props> {
  renderContinueButton = () => {
    const { dojFilePath } = this.props;
    if (dojFilePath !== '') {
      return <ContinueButton onContinue={this.onContinue} />;
    }
    return <DisabledContinueButton />;
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

  onContinue = () => {
    const { onFileConfirm } = this.props;
    onFileConfirm();
  };

  onGoBack = () => {
    const { onBack } = this.props;
    onBack();
    // TODO update state.county to '', but not sure how.
  };

  render() {
    return (
      <FormCard>
        <FormCardHeader>Upload .dat file</FormCardHeader>
        <FormCardContent>{this.renderCardContent()}</FormCardContent>
        <FormCardFooter>
          <div className="buttons">
            {this.renderContinueButton()}
            <GoBackButton onGoBack={this.onGoBack} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}
