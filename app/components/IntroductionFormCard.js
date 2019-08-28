// @flow
import React, { Component } from 'react';
import FormCard, { FormCardContent } from './FormCard';
import nonLinearScreenNumbers from '../constants/nonLinearScreenNumbers';
import styles from './IntroductionFormCard.css';

type Props = {
  onBegin: () => void,
  goToScreen: number => void
};

export default class CountySelectFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  goToFaq = () => {
    const { goToScreen } = this.props;
    goToScreen(nonLinearScreenNumbers.faq);
  };

  render() {
    const { onBegin } = this.props;
    return (
      <FormCard>
        <FormCardContent>
          <div className="text--centered">
            <h1 className={styles.introductionTitle}>
              Using Clear My Record will expedite the process of determining
              which Prop 64 convictions are eligible for relief under H&S §
              11361.9.
            </h1>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Here's what you need to do:</p>
            <div className="vertical-steps">
              <div className="vertical-steps__step">
                <div className="emoji emoji--big emoji--page-facing-up" />
                <h2 className={styles.stepTitle}>
                  Import bulk conviction data
                </h2>
                <p className={styles.stepBody}>
                  Choose your county and import the bulk Prop 64 conviction data
                  file received from the DOJ.
                </p>
              </div>
              <div className="vertical-steps__step">
                <div className="emoji emoji--big emoji--clipboard" />
                <h2 className={styles.stepTitle}>
                  Select eligibility requirements
                </h2>
                <p className={styles.stepBody}>
                  Determine which convictions to reduce or dismiss.
                </p>
              </div>
              <div className="vertical-steps__step">
                <div className="emoji emoji--big emoji--checkmark" />
                <h2 className={styles.stepTitle}>Review files</h2>
                <p className={styles.stepBody}>
                  Open and review files which now include Prop 64 eligibility
                  determinations.
                </p>
              </div>
            </div>
            <h2>
              If you run into problems or have questions, visit our{' '}
              <a href="#" className="link--subtle" onClick={this.goToFaq}>
                FAQs
              </a>{' '}
              or contact us at clearmyrecord@codeforamerica.org
            </h2>
            <div className="box nudge--large">
              <button
                className="button button--primary button--large"
                onClick={onBegin}
                type="button"
                id="begin"
              >
                Got it!
              </button>
            </div>
          </div>
        </FormCardContent>
      </FormCard>
    );
  }
}
