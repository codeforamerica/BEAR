// @flow
import * as React from 'react';

type Props = {
  children: string | React.Node,
  helpText?: string
};

export default class FormCardHeader extends React.Component<Props> {
  static defaultProps = {
    helpText: ''
  };

  render() {
    const { children, helpText } = this.props;
    let helpTextDiv;

    if (helpText) {
      helpTextDiv = <div className="text--help">{helpText}</div>;
    }

    return (
      <header className="form-card__header">
        <h1 className="form-card__title">{children}</h1>
        {helpTextDiv}
      </header>
    );
  }
}
