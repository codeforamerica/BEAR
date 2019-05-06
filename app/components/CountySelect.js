// @flow
import React, { Component } from 'react';

const COUNTIES = ['Contra Costa', 'Los Angeles', 'Sacramento', 'San Joaquin'];
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
      <div>
        <select onChange={this.handleCountySelect} id="county-select">
          {COUNTIES.map(county => (
            <option key={county} value={county.toUpperCase()}>
              {county}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
