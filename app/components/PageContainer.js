import React, { Component } from 'react';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import styles from './PageContainer.css';

type Props = {
  children: [Component],
  goToScreen: () => {},
  currentScreen: number
};

export default class PageContainer extends Component<Props, State> {
  render() {
    const { children, goToScreen, currentScreen } = this.props;
    return (
      <div className={`${styles.pageContainer} slab`}>
        <PageHeader />
        <PageContent>{children[currentScreen]}</PageContent>
        <PageFooter goToScreen={goToScreen} />
      </div>
    );
  }
}

export { PageFooter, PageContent, PageHeader };
