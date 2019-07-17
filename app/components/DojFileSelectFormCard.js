// @flow
import React, { Component } from 'react';
import DojFileInput from './DojFileInput';
import ContinueButton from './ContinueButton';
import DojFileItem from './DojFileItem';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import GoBackButton from './GoBackButton';
import styles from './DojFileSelectFormCard.css';

type Props = {
  dojFilePath: string,
  updateFilePath: string => void,
  onFileConfirm: void => void,
  onBack: void => void
};

export default class DojFileSelectFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderCardContent = () => {
    const { dojFilePath, updateFilePath } = this.props;
    if (dojFilePath !== '') {
      return (
        <DojFileItem
          className={styles.outlineBox}
          filePath={dojFilePath}
          onFileRemove={updateFilePath}
        />
      );
    }
    return <DojFileInput onFileSelect={updateFilePath} />;
  };

  render() {
    const { dojFilePath, onBack, onFileConfirm } = this.props;

    return (
      <FormCard>
        <FormCardHeader>
          Import Prop 64 bulk conviction data file
        </FormCardHeader>
        <FormCardContent>
          <p className={styles.semibold}>Choose a .dat file to import</p>
          <div className={styles.outlineBox}>{this.renderCardContent()}</div>
        </FormCardContent>
        <FormCardFooter>
          <div className="buttons">
            <ContinueButton
              onContinue={onFileConfirm}
              disabled={dojFilePath === ''}
            />
            <GoBackButton onGoBack={onBack} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}
