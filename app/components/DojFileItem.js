// @flow
import React, { Component } from 'react';
import path from 'path';
import styles from './DojFileItem.css';

type Props = {
  filePath: string,
  onFileRemove: string => void
};

export default class DojFileItem extends Component<Props> {
  formatFileName = () => {
    const { filePath } = this.props;
    return filePath.split(path.sep).pop();
  };

  fileRemove = () => {
    const { filePath, onFileRemove } = this.props;
    onFileRemove(filePath);
  };

  render() {
    return (
      <div className="doj-file">
        <p className={styles.fileName}>
          File imported: {this.formatFileName()}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
          <i
            className={`${styles.fileRemove} icon-close`}
            onClick={this.fileRemove}
            role="button"
          />
        </p>
      </div>
    );
  }
}
