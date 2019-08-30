import * as React from 'react';

type Props = {
  children: React.Node,
  className?: string
};

export default class FormCardHeader extends React.Component<Props> {
  static defaultProps = { className: '' };

  render() {
    const { children, className } = this.props;

    return <div className={`${className} form-card__footer`}>{children}</div>;
  }
}
