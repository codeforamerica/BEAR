import React, { Component } from 'react';

type Props = {
  children: [Component]
};

export default class PageContent extends Component<Props, State> {
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}
