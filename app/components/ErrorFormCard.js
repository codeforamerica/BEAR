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
        <p>Apologies, we were not able to read your file. </p>
        <p>Try to download the original DOJ file again and import the file.</p>

        <p>
          If you continue to run into problems, contact us at
          clearmyrecord@codeforamerica.org.
        </p>
      </div>
    );
    const otherFailure = (
      <div>
        <p>Sorry, we had trouble with your request. Please try again.</p>

        <p>
          If you continue to run into problems, contact us at
          clearmyrecord@codeforamerica.org and share with us the following error
          message by copying and pasting it into an email.
        </p>
        <p> {errorText} </p>
      </div>
    );
    return (
      <FormCard>
        <FormCardHeader />
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--warning" />

            <h3> Import error </h3>
            <div className="text--small with-padding-small">
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
