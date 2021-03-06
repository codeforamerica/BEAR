// @flow
import React, { Component } from 'react';
import { version } from '../../package.json';
import nonLinearScreenNumbers from '../constants/nonLinearScreenNumbers';
import styles from './PageFooter.css';
import cmrLogo from '../assets/images/cmr_black_logo.png';

type Props = {
  goToScreen: number => void,
  onStartOver: () => void
};

export default class PageFooter extends Component<Props> {
  goToTermsOfService = () => {
    const { goToScreen } = this.props;
    goToScreen(nonLinearScreenNumbers.termsOfService);
  };

  goToFaq = () => {
    const { goToScreen } = this.props;
    goToScreen(nonLinearScreenNumbers.faq);
  };

  onClickStartOver = (event: Event) => {
    const { onStartOver } = this.props;
    event.preventDefault();
    onStartOver();
  };

  render() {
    return (
      <footer className={`${styles.footer}`}>
        <div className={styles.footerContent}>
          <div className="media-box media-box--reversed">
            <div className="media-box__media media--large">
              <a
                href="#"
                className={styles.logoLink}
                onClick={this.onClickStartOver}
              >
                <img src={cmrLogo} alt="Clear My Record logo" />
              </a>
            </div>
            <div className="media-box__content">
              <div className={styles.footerLinks}>
                <a
                  href="#"
                  id="faq"
                  className={`${styles.footerLink} link--subtle`}
                  onClick={this.goToFaq}
                >
                  Frequently Asked Questions
                </a>
                <a
                  href="#"
                  id="terms-of-service"
                  className={`${styles.footerLink} link--subtle`}
                  onClick={this.goToTermsOfService}
                >
                  Terms of Service
                </a>
                <a
                  className={`${styles.footerLink} link--subtle`}
                  href="https://github.com/codeforamerica/BEAR/blob/master/NOTICES.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Software License (Clear My Record)
                </a>
                <a
                  className={`${styles.footerLink} link--subtle`}
                  href="https://github.com/codeforamerica/gogen/blob/master/NOTICE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Software License (Gogen)
                </a>
              </div>
              <div className={styles.footerMessage}>
                Clear My Record is a service delivered by{' '}
                <a
                  className="link--subtle"
                  href="https://www.codeforamerica.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code for America
                </a>{' '}
                on behalf of the people of California.
              </div>
              <div>v{version}</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
