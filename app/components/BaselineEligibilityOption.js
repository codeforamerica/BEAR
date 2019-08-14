import React, { Component } from 'react';
import RadioButton from './RadioButton';

type Props = {
  codeSection: string,
  codeSectionDescription: string,
  baselineEligibilityOptions: string,
  onEligibilityOptionSelect: (string, string) => void
};

export default class BaselineEligibilityOption extends Component<Props> {
  render() {
    const {
      codeSection,
      codeSectionDescription,
      baselineEligibilityOptions,
      onEligibilityOptionSelect
    } = this.props;
    return (
      <tr>
        <td>{`H&S § ${codeSectionDescription}`}</td>
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
