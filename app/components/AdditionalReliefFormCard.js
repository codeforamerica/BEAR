/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import ContinueButton from './ContinueButton';
import GoBackButton from './GoBackButton';

type Props = {
  additionalReliefOptions: AdditionalReliefOptions,
  onEligibilityOptionSelect: (string, boolean) => void,
  onOptionsConfirm: void => void,
  updateDate: void => void,
  onBack: void => void
};

export default class AdditionalReliefFormCard extends Component<Props> {
  onContinue = () => {
    const { onOptionsConfirm, updateDate } = this.props;
    onOptionsConfirm();
    updateDate();
  };

  onGoBack = () => {
    const { onBack } = this.props;
    onBack();
  };

  toggleUnder21Select = () => {
    const { onEligibilityOptionSelect, additionalReliefOptions } = this.props;
    onEligibilityOptionSelect(
      'subjectUnder21AtConviction',
      !additionalReliefOptions.subjectUnder21AtConviction
    );
  };

  render() {
    const { additionalReliefOptions } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Additional relief</FormCardHeader>
        <FormCardContent>
          <label htmlFor="dismiss_under_21" className="checkbox">
            Dismiss convictions for people who were convicted of one of the
            above convictions at an age of 21 or younger
            <input
              type="checkbox"
              name="dismiss_under_21"
              id="dismiss_under_21"
              value="true"
              defaultChecked={
                additionalReliefOptions.subjectUnder21AtConviction
              }
              onChange={this.toggleUnder21Select}
            />
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
