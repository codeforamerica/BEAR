// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import styles from './FormCard.css';
import BaselineEligibilityOption from './BaselineEligibilityOption';
import ContinueButton from './ContinueButton';
import GoBackButton from './GoBackButton';

type Props = {
  baselineEligibilityOptions: BaselineEligibilityOptions,
  onEligibilityOptionSelect: (string, string) => void,
  onOptionsConfirm: void => void,
  updateDate: void => void,
  onBack: void => void,
  isAllDismiss: boolean
};

export default class EligibilityOptionsFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onContinue = () => {
    const { onOptionsConfirm, updateDate, isAllDismiss } = this.props;

    if (isAllDismiss) {
      updateDate();
    }
    onOptionsConfirm();
  };

  render() {
    const {
      baselineEligibilityOptions,
      onEligibilityOptionSelect,
      onBack
    } = this.props;
    return (
      <FormCard>
        <FormCardHeader helpText="Choose whether to dismiss or reduce Prop 64 convictions.">
          Baseline eligibility
        </FormCardHeader>
        <FormCardContent
          className={`${styles.formCardContentFullWidth} ${styles.formCardNoBottomMargin}`}
        >
          <div className={styles.dataTableFirst}>
            <table className={`data-table ${styles.dataTable}`}>
              <caption>Misdemeanors and Infractions</caption>
              <tbody>
                <tr>
                  <td className={styles.dataTableContent}>
                    All misdemeanors and infractions will be marked as eligible
                    for dismissal.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.dataTableSecond}>
            <table className={`data-table ${styles.dataTable}`}>
              <caption>Felonies</caption>
              <thead>
                <tr>
                  <th>Type of convictions</th>
                  <th>Dismiss</th>
                  <th>Reduce</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    codeSection: '11357',
                    description: '11357 felonies including all subsections'
                  },
                  {
                    codeSection: '11358',
                    description: '11358 felonies including all subsections'
                  },
                  {
                    codeSection: '11359',
                    description: '11359 felonies including all subsections'
                  },
                  {
                    codeSection: '11360',
                    description: '11360 felonies including all subsections'
                  }
                ].map(option => {
                  return (
                    <BaselineEligibilityOption
                      key={option.codeSection}
                      codeSection={option.codeSection}
                      codeSectionDescription={option.description}
                      baselineEligibilityOptions={baselineEligibilityOptions}
                      onEligibilityOptionSelect={onEligibilityOptionSelect}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton disabled={false} onContinue={this.onContinue} />
          <GoBackButton onGoBack={onBack} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
