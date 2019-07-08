// @flow
import React, { Component } from 'react';

type Props = {
  labelText: string,
  group: string,
  minNumber: number,
  maxNumber: number,
  onNumberSelect: (string, number) => void,
  selectedNumber: number
};

export default class NumberSelect extends Component<Props> {
  handleNumberSelect = (e: SyntheticEvent<HTMLSelectElement>) => {
    const { group, onNumberSelect } = this.props;
    const selectedValue = parseInt(e.currentTarget.selectedOptions[0].text, 10);
    onNumberSelect(group, selectedValue);
  };

  numberRange = (numberThreshold: number, maximumNumber: number) => {
    const list = [];
    // eslint-disable-next-line no-plusplus
    for (let i = numberThreshold; i <= maximumNumber; i++) {
      list.push(i);
    }
    return list;
  };

  render() {
    const {
      labelText,
      group,
      minNumber,
      maxNumber,
      selectedNumber
    } = this.props;
    return (
      <div>
        {/* Below keeps failing linter despite having associated control (and passing screenreader) */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="number-select" className="sr-only">
          {labelText}
        </label>
        <div className="select">
          <select
            className="select__element"
            onChange={this.handleNumberSelect}
            id={`${group}-select`}
            value={selectedNumber}
          >
            {this.numberRange(minNumber, maxNumber).map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
