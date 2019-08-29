// @flow
import React, { Component } from 'react';
import styles from './ImpactItem.css';

type Props = {
  value: number,
  description: string
};

export default class ImpactItem extends Component<Props> {
  render() {
    const { value, description } = this.props;

    return (
      <div className={styles.impactItem}>
        <h3 className={styles.impactNumber}>{value.toLocaleString()}</h3>
        <p>{description}</p>
      </div>
    );
  }
}
