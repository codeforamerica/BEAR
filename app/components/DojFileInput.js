// @flow
import React, { Component } from 'react';
import styles from './DOJFileInput.css';

type Props = {
  onFileSelect: string => void,
  isFilepathEmpty: boolean
};

export default class DojFileInput extends Component<Props> {
  handleFileSelection = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onFileSelect } = this.props;
    const selectedFilesArray = event.currentTarget.files;
    Array.from(selectedFilesArray).forEach(file => {
      onFileSelect(file.path);
    });
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.value = '';
  };

  renderNoFileMessage = () => {
    const { isFilepathEmpty } = this.props;

    if (isFilepathEmpty) {
      return (
        <p id="no-error-message" className={styles.emptyMessage}>
          No file selected
        </p>
      );
    }
  };

  render() {
    return (
      <div>
        <label
          className={`${styles.noBottomMargin} button file-upload__label`}
          htmlFor="doj-file-input"
        >
          <input
            multiple
            onChange={this.handleFileSelection}
            type="file"
            accept=".dat, .csv"
            id="doj-file-input"
            name="doj-file-input"
            className="file-upload__input"
          />
          Select file
        </label>
        {this.renderNoFileMessage()}
      </div>
    );
  }
}
