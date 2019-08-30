// @flow
import * as React from 'react';
import PageHeader from './PageHeader';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import styles from './PageContainer.css';

type Props = {
  children: Array<React.Node>,
  goToScreen: number => void,
  currentScreen: number,
  onStartOver: () => void
};

export default class PageContainer extends React.Component<Props> {
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
