import React, { Component } from 'react';
import styles from './RadioButton.css';

type Props = {
  selected: boolean,
  value: string,
  group: string,
  onSelect: (string, string) => void
};

export default class RadioButton extends Component<Props> {
  handleSelect = () => {
    const { onSelect, group, value } = this.props;
    onSelect(group, value);
  };

  render() {
    const { selected, value, group } = this.props;

    return (
      <input
        defaultChecked={selected}
        type="radio"
        className={`${styles.radioButton} radio-button`}
        name={group}
        id={`${value}_${group}`}
        onChange={this.handleSelect}
      />
    );
  }
}
