// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

type Props = {
  currentScreen: number
};

const screenNumber = 4;

export default class ProcessingFormCard extends Component<Props> {
  render() {
    const { currentScreen } = this.props;
    return (
      <FormCard currentScreen={currentScreen} screenNumber={screenNumber}>
        <FormCardHeader>Preparing your files</FormCardHeader>
        <FormCardContent />
        <FormCardFooter />
      </FormCard>
    );
  }
}
