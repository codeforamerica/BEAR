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

  isEmptyFilePath = () => {
    const { dojFilePath } = this.props;
    return dojFilePath === '';
  };

  renderCardContent = () => {
    const { dojFilePath, updateFilePath } = this.props;

    if (this.isEmptyFilePath()) {
      return (
        <DojFileInput
          onFileSelect={updateFilePath}
          isFilepathEmpty={this.isEmptyFilePath()}
        />
      );
    }
    return (
      <div>
        {[dojFilePath].map(path => {
          return (
            <DojFileItem
              key={path}
              className={styles.outlineBox}
              filePath={path}
              onFileRemove={updateFilePath}
            />
          );
        })}
        <DojFileInput
          onFileSelect={updateFilePath}
          isFilepathEmpty={this.isEmptyFilePath()}
        />
      </div>
    );
  };

  render() {
    const { onBack, onFileConfirm } = this.props;

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
              disabled={this.isEmptyFilePath()}
            />
            <GoBackButton onGoBack={onBack} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}
