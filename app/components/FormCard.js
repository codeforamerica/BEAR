import React, { Component } from 'react';
import FormCardHeader from './FormCardHeader';
import FormCardFooter from './FormCardFooter';
import FormCardContent from './FormCardContent';

type Props = {
  children: [Component]
};

export default class FormCard extends Component<Props, State> {
  render() {
    const { children } = this.props;

    return <div className="form-card">{children}</div>;
  }
}

export { FormCardFooter, FormCardContent, FormCardHeader };
