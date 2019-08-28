// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

import StartOverButton from './StartOverButton';
import ErrorSection from './ErrorSection';

type Props = {
  onStartOver: () => void,
  errorText: string
};

export default class ErrorFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  extractErrors = (errorData: Object, parsing: boolean) => {
    let keys;
    if (parsing) {
      keys = Object.keys(errorData).filter(
        key => errorData[key].errorType === 'PARSING'
      );
    } else {
      keys = Object.keys(errorData).filter(
        key => errorData[key].errorType !== 'PARSING'
      );
    }
    return keys.reduce(
      (res, key) => Object.assign(res, { [key]: errorData[key] }),
      {}
    );
  };

  renderErrorSection = (
    errorData: Object,
    parsing: boolean,
    header: string
  ) => {
    const errors = this.extractErrors(errorData, parsing);

    if (Object.keys(errors).length !== 0) {
      return (
        <ErrorSection header={header} errors={errors} showFile={parsing} />
      );
    }
    return null;
  };

  render() {
    const { errorText, onStartOver } = this.props;
    const errorData = JSON.parse(errorText);

    return (
      <FormCard>
        <FormCardHeader>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--warning" />
            <h3> Error </h3>
            <br />
            <div className="text--help">
              Sorry, we had trouble with your request.
            </div>
            <br />
            <div className="text--help">
              If you continue to run into problems, contact us at
              clearmyrecord@codeforamerica.org and share the following error
              messages by copying and pasting them into an email.
            </div>
          </div>
        </FormCardHeader>
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="box with-padding-med">
              {this.renderErrorSection(
                errorData,
                true,
                'We were not able to read the following files. Please download the original DOJ files and try again.'
              )}
              {this.renderErrorSection(
                errorData,
                false,
                'We encountered the following errors:'
              )}
            </div>
            <StartOverButton onStartOver={onStartOver} />
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
