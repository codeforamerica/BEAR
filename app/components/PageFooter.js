import React, { Component } from 'react';
import { version } from '../../package.json';
import styles from './PageFooter.css';
import cmrLogo from '../assets/images/cmr_black_logo.png';

export default class PageFooter extends Component<Props, State> {
  render() {
    return (
      <footer className={`${styles.footer}`}>
        <div className={styles.footerContent}>
          <div className="media-box media-box--reversed">
            <div className="media-box__media media--large">
              <img src={cmrLogo} alt="Clear My Record logo" />
            </div>
            <div className="media-box__content">
              <div className={styles.footerLinks}>
                <a href="#" className={`${styles.footerLink} link--subtle`}>
                  Frequently Asked Questions
                </a>
                <a href="#" className={`${styles.footerLink} link--subtle`}>
                  Terms of Service
                </a>
                <a href="#" className={`${styles.footerLink} link--subtle`}>
                  Help Documents
                </a>
              </div>
              <div className={styles.footerMessage}>
                Clear My Record is a service delivered by{' '}
                <a
                  className="link--subtle"
                  href="https://www.codeforamerica.org"
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
