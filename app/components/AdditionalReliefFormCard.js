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
import NumberSelect from './NumberSelect';

type Props = {
  additionalReliefOptions: AdditionalReliefOptions,
  onReliefOptionSelect: (string, any) => void,
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
    const { onReliefOptionSelect, additionalReliefOptions } = this.props;

    const toggledValue = !additionalReliefOptions[group];
    onReliefOptionSelect(group, toggledValue);
  };

  handleNumberSelect = (group: string, selectedNumber: number) => {
    const { onReliefOptionSelect } = this.props;
    onReliefOptionSelect(group, selectedNumber);
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
            <NumberSelect
              labelText="Choose a minimum age to consider people eligible for dismissal."
              group="subjectAgeThreshold"
              minNumber={40}
              maxNumber={65}
              onNumberSelect={this.handleNumberSelect}
              selectedNumber={additionalReliefOptions.subjectAgeThreshold}
            />
          </Checkbox>
          <Checkbox
            checked={
              additionalReliefOptions.dismissYearsSinceConvictionThreshold
            }
            labelText="Dismiss convictions that occurred more than X years ago."
            group="dismissYearsSinceConvictionThreshold"
            onCheck={this.handleChecked}
          >
            Dismiss convictions that occurred more than X years ago:
            <NumberSelect
              labelText="Choose a minimum number of years since last conviction for dismissal."
              group="yearsSinceConvictionThreshold"
              minNumber={1}
              maxNumber={15}
              onNumberSelect={this.handleNumberSelect}
              selectedNumber={
                additionalReliefOptions.yearsSinceConvictionThreshold
              }
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
