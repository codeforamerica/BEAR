import React, { Component } from 'react';
import RadioButton from './RadioButton';

type Props = {
  codeSection: string,
  baselineEligibilityOptions: string,
  onEligibilityOptionSelect: (string, string) => void
};

export default class BaselineEligibilityOption extends Component<Props> {
  render() {
    const {
      codeSection,
      baselineEligibilityOptions,
      onEligibilityOptionSelect
    } = this.props;
    return (
      <tr>
        <td>
          <p>{`HS ${codeSection} felonies`}</p>
        </td>
        <td>
          <RadioButton
            selected={baselineEligibilityOptions[codeSection] === 'dismiss'}
            value="dismiss"
            group={codeSection}
            onSelect={onEligibilityOptionSelect}
          />
        </td>
        <td>
          <RadioButton
            selected={baselineEligibilityOptions[codeSection] === 'reduce'}
            value="reduce"
            group={codeSection}
            onSelect={onEligibilityOptionSelect}
          />
        </td>
      </tr>
    );
  }
}
