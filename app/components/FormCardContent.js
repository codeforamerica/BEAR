import React, { Component } from 'react';

type Props = {
  children: [Component],
  className: string
};

export default class FormCardContent extends Component<Props, State> {
  render() {
    const { children, className } = this.props;

    return (
      <div className={`form-card__content ${className || ''}`}>{children}</div>
    );
  }
}
