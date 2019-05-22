// @flow
import React, { Component } from 'react';

import counties from '../constants/californiaCounties';
import { FormCardContent } from './FormCard';

type Props = {
  onCountySelect: County => void
};

export default class Home extends Component<Props> {
  handleCountySelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    const { onCountySelect } = this.props;
    onCountySelect({
      name: e.currentTarget.selectedOptions[0].text,
      code: e.currentTarget.value
    });
  };

  render() {
    return (
      <FormCardContent>
        <p className="form-question">Select your county</p>
        <div className="select">
          <select
            className="select__element"
            onChange={this.handleCountySelect}
            id="county-select"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a county
            </option>
            {counties.map(county => (
              <option key={county} value={county.toUpperCase()}>
                {county}
              </option>
            ))}
          </select>
        </div>
      </FormCardContent>
    );
  }
}
