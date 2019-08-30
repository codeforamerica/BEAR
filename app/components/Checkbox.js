// @flow
import * as React from 'react';
import styles from './Checkbox.css';

type Props = {
  checked: boolean,
  children: React.Node,
  group: string,
  labelText: string,
  value: string,
  onChange: (string, string) => void
};

export default class Checkbox extends React.Component<Props> {
  handleChange = () => {
    const { onChange, group, value } = this.props;
    onChange(group, value);
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
          className={`shift-fourth-fifths ${styles.checkbox} checkbox`}
        >
          <span className="sr-only">{labelText}</span>
          <input
            defaultChecked={checked}
            type="checkbox"
            name={group}
            value={true}
            id={`true_${group}`}
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}
