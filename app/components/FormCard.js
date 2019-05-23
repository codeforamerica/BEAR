import React, { Component } from 'react';
import FormCardHeader from './FormCardHeader';
import FormCardFooter from './FormCardFooter';
import FormCardContent from './FormCardContent';

type Props = {
  currentScreen: number,
  screenNumber: number,
  children: [Component]
};

export default class FormCard extends Component<Props, State> {
  render() {
    const { currentScreen, screenNumber, children } = this.props;

    if (currentScreen !== screenNumber) {
      return null;
    }

    return <div className="form-card">{children}</div>;
  }
}

export { FormCardFooter, FormCardContent, FormCardHeader };
