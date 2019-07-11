// @flow
import React, { Component } from 'react';
import styles from './DOJFileInput.css';

type Props = {
  onFileSelect: string => void
};

export default class DojFileInput extends Component<Props> {
  handleFileSelection = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onFileSelect } = this.props;
    const filePath = event.currentTarget.files[0].path;
    onFileSelect(filePath);
  };

  render() {
    return (
      <div className="file-upload">
        <label className="button file-upload__label" htmlFor="doj-file-input">
          <input
            onChange={this.handleFileSelection}
            type="file"
            accept=".dat, .csv"
            id="doj-file-input"
            name="doj-file-input"
            className="file-upload__input"
          />
          Select file
        </label>
        <p className={styles.emptyMessage}>No file selected</p>
      </div>
    );
  }
}
