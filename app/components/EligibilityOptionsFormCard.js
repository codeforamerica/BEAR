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
  updateDate: void => void,
  onBack: void => void,
  isAllDismiss: boolean
};

export default class EligibilityOptionsFormCard extends Component<Props> {
  onContinue = () => {
    const { onOptionsConfirm, updateDate, isAllDismiss } = this.props;

    if (isAllDismiss) {
      updateDate();
    }
    onOptionsConfirm();
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
            Choose whether to dismiss or reduce Prop 64 convictions.
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
                  <p>All Prop 64 misdemeanors and infractions</p>
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
                { codeSection: '11357(a)', description: '11357 (a) felonies' },
                { codeSection: '11357(b)', description: '11357 (b) felonies' },
                { codeSection: '11357(c)', description: '11357 (c) felonies' },
                { codeSection: '11357(d)', description: '11357 (d) felonies' },
                {
                  codeSection: '11358',
                  description: '11358 felonies including all subsections'
                },
                {
                  codeSection: '11359',
                  description: '11359 felonies including all subsections'
                },
                {
                  codeSection: '11360',
                  description: '11360 felonies including all subsections'
                }
              ].map(option => {
                return (
                  <BaselineEligibilityOption
                    key={option.codeSection}
                    codeSection={option.codeSection}
                    codeSectionDescription={option.description}
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
