import React, { Component } from 'react';
import cmrLogo from '../assets/images/cmr_black_logo.png';
import styles from './PageHeader.css';

type Props = {
  onStartOver: () => void
};

export default class PageHeader extends Component<Props, State> {
  onClickStartOver = event => {
    const { onStartOver } = this.props;
    event.preventDefault();
    onStartOver();
  };

  render() {
    return (
      <header className={`main-header ${styles.mainHeader}`}>
        <div className="toolbar">
          <div className="toolbar__left">
            <a
              href="#"
              className={styles.logoLink}
              onClick={this.onClickStartOver}
            >
              <img
                src={cmrLogo}
                className={styles.mainHeaderLogo}
                alt="Clear My Record logo"
              />
            </a>
          </div>
        </div>
      </header>
    );
  }
}
