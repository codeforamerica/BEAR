// @flow
import React, { Component } from 'react';

type Props = {
  header: string,
  errors: Errors,
  showFile: boolean
};

const preStyle = {
  outline: 'auto thin',
  textAlign: 'left',
  whiteSpace: 'pre-wrap'
};

const headerStyle = {
  textAlign: 'left'
};

export default class ErrorSection extends Component<Props> {
  render() {
    const { header, errors, showFile } = this.props;
    return (
      <div>
        <p style={headerStyle}> {header} </p>
        <pre style={preStyle}>
          {Object.keys(errors).map(item => (
            <p key={item}>
              {showFile
                ? `${item}: ${errors[item].errorMessage}`
                : `${errors[item].errorMessage}`}
            </p>
          ))}
        </pre>
      </div>
    );
  }
}
