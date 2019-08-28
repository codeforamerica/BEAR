import React, { Component } from 'react';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import styles from './PageContainer.css';

type Props = {
  children: [Component],
  goToScreen: () => {},
  currentScreen: number,
  onStartOver: () => void
};

export default class PageContainer extends Component<Props, State> {
  render() {
    const { children, goToScreen, currentScreen, onStartOver } = this.props;
    return (
      <div className={`${styles.pageContainer} slab`}>
        <PageHeader onStartOver={onStartOver} />
        <PageContent>{children[currentScreen]}</PageContent>
        <PageFooter goToScreen={goToScreen} onStartOver={onStartOver} />
      </div>
    );
  }
}

export { PageFooter, PageContent, PageHeader };
