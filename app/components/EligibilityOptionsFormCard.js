/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
// @flow
import React, { Component } from 'react';

import { TupleType } from 'flow-runtime';
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
  eligibilityOptions: BaselineEligibilityOptions,
  onEligibilityOptionSelect: (string, string) => void,
  onOptionsConfirm: void => void,
  onOptionsRunScript: void => void,
  onBack: void => void
};

export default class EligibilityOptionsFormCard extends Component<Props> {
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
    const { eligibilityOptions, onEligibilityOptionSelect } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          Analysis for Implementation
          <p className="options-copy">
            Choose from the following options to expedite your office's review
            of records from the state summary criminal history information
            database for AB-1793.
          </p>
        </FormCardHeader>
        <FormCardContent>
          <h2>Baseline eligibility</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Dismiss</th>
                <th>Reduce</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>All misdemeanors and infractions</p>
                </td>
                <td>
                  <RadioButton
                    selected={true}
                    value="misdemeanor_infraction"
                    group="no_reduce_option"
                  />
                </td>
                <td />
              </tr>
              {Object.entries(eligibilityOptions).map(
                ([_, object]: TupleType<number, EligibilityOption>) => {
                  return (
                    <BaselineEligibilityOption
                      key={object.codeSection}
                      codeSection={object.codeSection}
                      selectedOption={object.option}
                      onEligibilityOptionSelect={onEligibilityOptionSelect}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton onContinue={this.onContinue} />
          <GoBackButton onGoBack={this.onGoBack} />
      </FormCardFooter>
      </FormCard>
    );
  }
}
