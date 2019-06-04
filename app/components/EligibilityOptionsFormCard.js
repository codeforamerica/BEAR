// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import BaselineEligibilityOption from './BaselineEligibilityOption';
import RadioButton from './RadioButton';

type Props = {
  currentScreen: number,
  eligibilityOptions: BaselineEligibilityOptions
};

const screenNumber = 3;

export default class EligibilityOptionsFormCard extends Component<Props> {
  render() {
    const { currentScreen, eligibilityOptions } = this.props;
    return (
      <FormCard currentScreen={currentScreen} screenNumber={screenNumber}>
        <FormCardHeader>Analysis for Implementation</FormCardHeader>
        <FormCardContent>
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
                ([codeSection, selectedOption]) => {
                  return (
                    <BaselineEligibilityOption
                      key={codeSection}
                      codeSection={codeSection}
                      selectedOption={selectedOption}
                    />
                  );
                }
              )}
            </tbody>
          </table>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
