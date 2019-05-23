// @flow
import React, { Component } from 'react';
import path from 'path';
import styles from './DojFileItem.css';

type Props = {
  filePath: string
};

export default class DojFileItem extends Component<Props> {
  formatFileName = () => {
    const { filePath } = this.props;
    return filePath.split(path.sep).pop();
  };

  render() {
    return (
      <div className="doj-file">
        <p className={styles.fileName}>
          {this.formatFileName()}
          <i className={`${styles.fileRemove} icon-close`} />
        </p>
      </div>
    );
  }
}
