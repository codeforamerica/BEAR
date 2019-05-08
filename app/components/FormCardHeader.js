import React, { Component } from 'react';

type Props = {
  children: string
};

export default class FormCardHeader extends Component<Props, State> {
  render() {
    const { children } = this.props;

    return (
      <header className="form-card__header">
        <h1 className="form-card__title">{children}</h1>
      </header>
    );
  }
}
