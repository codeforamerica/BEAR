import React, { Component } from 'react';
import PageFooter from './PageFooter';
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
        <PageFooter />
      </div>
    );
  }
}

export { PageFooter, PageContent, PageHeader };
