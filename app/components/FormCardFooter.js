import React, { Component } from 'react';

type Props = {
  children: [Component]
};

export default class FormCardHeader extends Component<Props, State> {
  render() {
    const { children } = this.props;

    return <div className="form-card__footer">{children}</div>;
  }
}
