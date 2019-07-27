// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import StartOverButton from './StartOverButton';

type Props = {
  onStartOver: void => void
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
    return (
      <FormCard>
        <FormCardHeader />
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <h3> Import error </h3>
            <div>
              <p>Apologies, we were not able to read your file. </p>
              <p>
                Try to download the original DOJ file again and import the file.
              </p>

              <p>
                If you continue to run into problems, contact us at
                clearmyrecord@codeforamerica.org.
              </p>
            </div>
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
