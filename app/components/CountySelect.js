// @flow
import React, { Component } from 'react';
import styles from './CountySelect.css';

import counties from '../constants/californiaCounties';

type Props = {
  onCountySelect: County => void,
  selectedCounty: string
};

export default class CountySelect extends Component<Props> {
  handleCountySelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    const { onCountySelect } = this.props;
    onCountySelect({
      name: e.currentTarget.selectedOptions[0].text,
      code: e.currentTarget.value
    });
  };

  render() {
    const { selectedCounty } = this.props;
    return (
      <div>
        <p className="form-question">Select your county</p>
        <div className="select">
          <select
            className={`${styles.countySelect} select__element`}
            onChange={this.handleCountySelect}
            id="county-select"
            value={selectedCounty}
          >
            <option value="" disabled>
              Choose your county
            </option>
            {counties.map(county => (
              <option key={county} value={county.toUpperCase()}>
                {county}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
