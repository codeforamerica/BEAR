/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import BaselineEligibilityOption from './BaselineEligibilityOption';
import RadioButton from './RadioButton';
import ContinueButton from './ContinueButton';
import GoBackButton from './GoBackButton';

type Props = {
  additionalReliefOptions: AdditionalReliefOptions,
  onEligibilityOptionSelect: (string, string) => void,
  onOptionsConfirm: void => void,
  onOptionsRunScript: void => void,
  onBack: void => void
};

export default class AdditionalReliefFormCard extends Component<Props> {
  onContinue = () => {
    const { onOptionsConfirm, onOptionsRunScript } = this.props;
    onOptionsConfirm();
    onOptionsRunScript();
  };

  onGoBack = () => {
    const { onBack } = this.props;
    onBack();
  };

  render() {
    return (
      <FormCard>
        <FormCardHeader>Additional relief</FormCardHeader>
        <FormCardContent>
          <label htmlFor="dismiss_under_21" className="checkbox">
            <input
              type="checkbox"
              name="dismiss_under_21"
              id="dismiss_under_21"
            />
            Dismiss convictions for people who were convicted of one of the
            above convictions at an age of 21 or younger
          </label>
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton onContinue={this.onContinue} />
          <GoBackButton onGoBack={this.onGoBack} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
