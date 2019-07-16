import React, { Component } from 'react';
import PageHeader from './PageHeader';
import PageContent from './PageContent';

type Props = {
  children: [Component],
  currentScreen: number
};

export default class PageContainer extends Component<Props, State> {
  render() {
    const { children, currentScreen } = this.props;
    return (
      <div className="slab">
        <PageHeader />
        <PageContent>{children[currentScreen]}</PageContent>
      </div>
    );
  }
}

export { PageContent, PageHeader };
