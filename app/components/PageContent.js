// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class PageContent extends React.Component<Props> {
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}
