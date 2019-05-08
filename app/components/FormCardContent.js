import React, { Component } from 'react';

type Props = {
  children: [Component]
};

export default class FormCardContent extends Component<Props, State> {
  render() {
    const { children } = this.props;

    return <div className="form-card__content">{children}</div>;
  }
}
