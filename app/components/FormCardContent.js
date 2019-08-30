// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
  className?: string
};

export default class FormCardContent extends React.Component<Props> {
  static defaultProps = { className: '' };

  render() {
    const { children, className } = this.props;

    return (
      <div className={`form-card__content ${className || ''}`}>{children}</div>
    );
  }
}
