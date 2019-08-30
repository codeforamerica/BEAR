// @flow
import * as React from 'react';
import FormCardHeader from './FormCardHeader';
import FormCardFooter from './FormCardFooter';
import FormCardContent from './FormCardContent';
import styles from './FormCard.css';

type Props = {
  children: React.Node
};

export default class FormCard extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return <div className={`form-card ${styles.formCard}`}>{children}</div>;
  }
}

export { FormCardFooter, FormCardContent, FormCardHeader };
