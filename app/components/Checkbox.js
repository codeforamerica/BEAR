import React, { Component } from 'react';
import styles from './Checkbox.css';

type Props = {
  checked: boolean,
  children: string,
  group: string,
  labelText: string,
  value: string,
  onCheck: (string, string) => void
};

export default class Checkbox extends Component<Props> {
  handleCheck = () => {
    const { onCheck, group, value } = this.props;
    onCheck(group, value);
  };

  render() {
    const { checked, group, labelText, children } = this.props;

    return (
      <div className="form-group grid">
        <div className="form-question grid__item width-two-thirds">
          {children}
        </div>
        <label
          htmlFor={`true_${group}`}
          className={`shift-fourth-fifths ${styles.checkbox}`}
        >
          <span className="sr-only">{labelText}</span>
          <input
            defaultChecked={checked}
            type="checkbox"
            name={group}
            value={true}
            id={`true_${group}`}
            onChange={this.handleCheck}
          />
        </label>
      </div>
    );
  }
}
