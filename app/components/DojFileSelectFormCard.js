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
  dojFilePaths: Array<string>,
  updateFilePath: string => void,
  onFileConfirm: void => void,
  onFileRemove: string => void,
  onBack: void => void
};

export default class DojFileSelectFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderCardContent = () => {
    const { dojFilePaths, updateFilePath, onFileRemove } = this.props;

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
        {dojFilePaths.map(path => {
          return (
            <DojFileItem
              key={path}
              className={styles.outlineBox}
              filePath={path}
              onFileRemove={onFileRemove}
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

  isEmptyFilePath = () => {
    const { dojFilePaths } = this.props;
    return dojFilePaths.length === 0;
  };

  render() {
    const { onBack, onFileConfirm } = this.props;

    return (
      <FormCard>
        <FormCardHeader helpText="Import the original .dat files received from the DOJ.">
          Import Prop 64 bulk conviction data files
        </FormCardHeader>
        <FormCardContent>
          <p className={styles.semibold}>Choose .dat files to import</p>
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
