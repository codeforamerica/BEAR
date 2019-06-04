import React, { Component } from 'react';
import styles from './RadioButton.css';

type Props = {
  selected: boolean,
  value: string,
  group: string
};

export default class RadioButton extends Component<Props> {
  render() {
    const { selected, value, group } = this.props;

    return (
      <input
        defaultChecked={selected}
        type="radio"
        className={styles.radioButton}
        name={group}
        id={`${value}_${group}`}
      />
    );
  }
}
