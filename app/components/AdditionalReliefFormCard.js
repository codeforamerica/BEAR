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
  onReliefOptionSelect: (string, AdditionalReliefOption) => void,
  onOptionsConfirm: void => void,
  updateDate: void => void,
  onBack: void => void
};

export default class AdditionalReliefFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onContinue = () => {
    const { onOptionsConfirm, updateDate } = this.props;
    onOptionsConfirm();
    updateDate();
  };

  handleToggleChecked = (group: string) => {
    const { onReliefOptionSelect, additionalReliefOptions } = this.props;

    const toggledValue = !additionalReliefOptions[group];
    onReliefOptionSelect(group, toggledValue);
  };

  handleNumberSelect = (group: string, selectedNumber: number) => {
    const { onReliefOptionSelect } = this.props;
    onReliefOptionSelect(group, selectedNumber);
  };

  render() {
    const { additionalReliefOptions, onBack } = this.props;
    return (
      <FormCard>
        <FormCardHeader helpText="Choose from the following options to expand relief. These options will only apply to convictions you chose to reduce in the previous page. All dates will be calculated as of 7/1/2020.">
          Additional relief
        </FormCardHeader>
        <FormCardContent>
          <Checkbox
            checked={
              additionalReliefOptions.dismissYearsSinceConvictionThreshold
            }
            labelText="Dismiss convictions that occurred more than X years ago."
            group="dismissYearsSinceConvictionThreshold"
            onChange={this.handleToggleChecked}
          >
            Dismiss convictions that occurred more than X years ago:
            <NumberSelect
              labelText="Choose a minimum number of years since this conviction for dismissal."
              group="yearsSinceConvictionThreshold"
              minNumber={1}
              maxNumber={15}
              onNumberSelect={this.handleNumberSelect}
              selectedNumber={
                additionalReliefOptions.yearsSinceConvictionThreshold
              }
            />
          </Checkbox>
          <Checkbox
            checked={additionalReliefOptions.dismissYearsCrimeFreeThreshold}
            labelText="Dismiss convictions if the individual has had no convictions in the past X years."
            group="dismissYearsCrimeFreeThreshold"
            onChange={this.handleToggleChecked}
          >
            Dismiss convictions if the individual has had no convictions in the
            past X years:
            <NumberSelect
              labelText="Choose a minimum number of years since last conviction for dismissal."
              group="yearsCrimeFreeThreshold"
              minNumber={1}
              maxNumber={15}
              onNumberSelect={this.handleNumberSelect}
              selectedNumber={additionalReliefOptions.yearsCrimeFreeThreshold}
            />
          </Checkbox>
          <Checkbox
            checked={additionalReliefOptions.subjectHasOnlyProp64Charges}
            labelText="Select to dismiss convictions for people who only have HS 11357, 11358, 11359, 11360 convictions on their record."
            group="subjectHasOnlyProp64Charges"
            onChange={this.handleToggleChecked}
          >
            Dismiss all H&S § 11357, H&S § 11358, H&S § 11359, or H&S § 11360
            convictions if those are the only convictions on an
            individual&apos;s record.
          </Checkbox>
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton onContinue={this.onContinue} />
          <GoBackButton onGoBack={onBack} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
