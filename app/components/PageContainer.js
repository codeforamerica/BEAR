import React, { Component } from 'react';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import PageContent from './PageContent';

type Props = {
  children: [Component]
};

export default class PageContainer extends Component<Props, State> {
  render() {
    const { children } = this.props;
    return (
      <div className="slab">
        <PageHeader />
        <PageContent>{children}</PageContent>
        <PageFooter />
      </div>
    );
  }
}

export { PageFooter, PageContent, PageHeader };
