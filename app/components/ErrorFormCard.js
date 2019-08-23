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
  onStartOver: void => void,
  errorText: string
};

export default class ErrorFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  extractErrors = (errorData: Object, fileparsing: boolean) => {
    let keys;
    if (fileparsing) {
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

  renderErrorSection = (errorData: Object, parsing: boolean, title: string) => {
    const errors = this.extractErrors(errorData, parsing);

    if (Object.keys(errors).length !== 0) {
      return <ErrorSection title={title} errors={errors} />;
    }
    return null;
  };

  onClickStartOver = () => {
    const { onStartOver } = this.props;
    onStartOver();
  };

  render() {
    const { errorText } = this.props;
    const errorData = JSON.parse(errorText);

    return (
      <FormCard>
        <FormCardHeader />
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--warning" />
            <div className="box with-padding-med">
              <div>
                <h3> Error </h3>
                <div>
                  <p>
                    Sorry, we had trouble with your request. Please try again.
                  </p>
                  <div>
                    {this.renderErrorSection(errorData, true, 'Parsing')}
                    {this.renderErrorSection(errorData, false, 'Non Parsing')}
                  </div>
                </div>
              </div>
            </div>
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
