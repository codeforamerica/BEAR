// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import StartOverButton from './StartOverButton';

type Props = {
  onStartOver: void => void,
  gogenFailureValidation: boolean,
  errorText: string
};

export default class ErrorFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickStartOver = () => {
    const { onStartOver } = this.props;
    onStartOver();
  };

  render() {
    const { gogenFailureValidation, errorText } = this.props;

    const validationFailure = (
      <div>
        <h3> Import error </h3>
        <div>
          <p>Apologies, we were not able to read your file. </p>
          <p>
            Try to download the original DOJ file again and import the file.
          </p>

          <div className="box nudge--large">
            If you continue to run into problems, contact us at
            clearmyrecord@codeforamerica.org.
          </div>
        </div>
      </div>
    );

    const preStyle = {
      outline: 'auto thin',
      'text-align': 'left'
    };

    const otherFailure = (
      <div>
        <h3> Error </h3>
        <div>
          <p> Sorry, we had trouble with your request.Please try again.</p>

          <div className="box nudge--large">
            If you continue to run into problems, contact us at
            clearmyrecord@codeforamerica.org and share with us the following
            error message by copying and pasting it into an email:
          </div>
          <pre style={preStyle}> {errorText} </pre>
        </div>
      </div>
    );

    return (
      <FormCard>
        <FormCardHeader />
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--warning" />
            <div className="box with-padding-med">
              {gogenFailureValidation ? validationFailure : otherFailure}
            </div>
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
