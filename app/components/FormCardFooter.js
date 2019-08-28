import React, { Component } from 'react';

type Props = {
  children: [Component],
  className: string
};

export default class FormCardHeader extends Component<Props, State> {
  classNames = () => {
    const { className } = this.props;

    if (className !== undefined) {
      return `${className} form-card__footer`;
    }
    return 'form-card__footer';
  };

  render() {
    const { children } = this.props;

    return <div className={this.classNames()}>{children}</div>;
  }
}
