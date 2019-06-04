import React, { Component } from 'react';
import RadioButton from './RadioButton';

type Props = {
  codeSection: string,
  selectedOption: string
};

export default class BaselineEligibilityOption extends Component<Props> {
  render() {
    const { codeSection, selectedOption } = this.props;
    return (
      <tr>
        <td>
          <p>{`HS ${codeSection} felonies`}</p>
        </td>
        <td>
          <RadioButton
            selected={selectedOption === 'dismiss'}
            value="dismiss"
            group={codeSection}
          />
        </td>
        <td>
          <RadioButton
            selected={selectedOption === 'reduce'}
            value="reduce"
            group={codeSection}
          />
        </td>
      </tr>
    );
  }
}
