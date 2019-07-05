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
import Checkbox from './Checkbox';
import AgeSelect from './AgeSelect';

type Props = {
  additionalReliefOptions: AdditionalReliefOptions,
  // eslint-disable-next-line flowtype/no-weak-types
  onEligibilityOptionSelect: (string, any) => void,
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

  handleChecked = (group: string) => {
    const { onEligibilityOptionSelect, additionalReliefOptions } = this.props;

    const toggledValue = !additionalReliefOptions[group];
    onEligibilityOptionSelect(group, toggledValue);
  };

  handleAgeSelect = (age: number) => {
    const { onEligibilityOptionSelect } = this.props;
    onEligibilityOptionSelect('subjectAgeThreshold', age);
  };

  render() {
    const { additionalReliefOptions } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Additional relief</FormCardHeader>
        <FormCardContent>
          <Checkbox
            checked={additionalReliefOptions.subjectUnder21AtConviction}
            labelText="Select to dismiss convictions for people who were convicted of one of the above convictions at an age of 21 or younger."
            group="subjectUnder21AtConviction"
            onCheck={this.handleChecked}
          >
            Dismiss convictions for people who were convicted of one of the
            above convictions at an age of 21 or younger.
          </Checkbox>
          <Checkbox
            checked={additionalReliefOptions.dismissOlderThanAgeThreshold}
            labelText="Select to dismiss convictions for people who are older than specified age."
            group="dismissOlderThanAgeThreshold"
            onCheck={this.handleChecked}
          >
            Dismiss convictions for people who are older than X:
            <AgeSelect
              labelText="Choose a minimum age to consider people eligible for dismissal."
              minAge={40}
              maxAge={65}
              onAgeSelect={this.handleAgeSelect}
              selectedAge={additionalReliefOptions.subjectAgeThreshold}
            />
          </Checkbox>
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton onContinue={this.onContinue} />
          <GoBackButton onGoBack={this.onGoBack} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
