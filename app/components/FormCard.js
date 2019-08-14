import React, { Component } from 'react';
import FormCardHeader from './FormCardHeader';
import FormCardFooter from './FormCardFooter';
import FormCardContent from './FormCardContent';
import styles from './FormCard.css';

type Props = {
  children: [Component]
};

export default class FormCard extends Component<Props> {
  render() {
    const { children } = this.props;

    return <div className={`form-card ${styles.formCard}`}>{children}</div>;
  }
}

export { FormCardFooter, FormCardContent, FormCardHeader };
