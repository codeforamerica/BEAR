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
  baselineEligibilityOptions: BaselineEligibilityOptions,
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
    const {
      baselineEligibilityOptions,
      onEligibilityOptionSelect
    } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          Baseline eligibility
          <p className="text--help">
            Choose from the following options to expedite your office's review
            of records from the state summary criminal history information
            database for AB-1793.
          </p>
        </FormCardHeader>
        <FormCardContent>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type of convictions</th>
                <th>Dismiss</th>
                <th>Reduce</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>All HS 11357-60 misdemeanors and infractions</p>
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
              {[
                '11357(a)',
                '11357(b)',
                '11357(c)',
                '11357(d)',
                '11358',
                '11359',
                '11360'
              ].map(codeSection => {
                return (
                  <BaselineEligibilityOption
                    key={codeSection}
                    codeSection={codeSection}
                    baselineEligibilityOptions={baselineEligibilityOptions}
                    onEligibilityOptionSelect={onEligibilityOptionSelect}
                  />
                );
              })}
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
