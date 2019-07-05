// @flow
import React, { Component } from 'react';

type Props = {
  labelText: string,
  minAge: number,
  maxAge: number,
  onAgeSelect: number => void,
  selectedAge: number
};

export default class AgeSelect extends Component<Props> {
  handleNumberSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    const { onAgeSelect } = this.props;
    console.log('hello', e.currentTarget.selectedOptions[0].text);
    onAgeSelect(parseInt(e.currentTarget.selectedOptions[0].text, 10));
  };

  ageRange = (subjectAgeThreshold: number, maximumAge: number) => {
    const list = [];
    // eslint-disable-next-line no-plusplus
    for (let i = subjectAgeThreshold; i <= maximumAge; i++) {
      list.push(i);
    }
    return list;
  };

  render() {
    const { labelText, minAge, maxAge, selectedAge } = this.props;
    return (
      <div>
        {/* Below keeps failing linter despite having associated control (and passing screenreader) */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="age-select" className="sr-only">
          {labelText}
        </label>
        <div className="select">
          <select
            className="select__element"
            onChange={this.handleNumberSelect}
            id="age-select"
            value={selectedAge}
          >
            {this.ageRange(minAge, maxAge).map(age => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
