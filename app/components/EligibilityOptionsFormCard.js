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

const screenNumber = 3;

export default class EligibilityOptionsFormCard extends Component<Props> {
  render() {
    const { currentScreen } = this.props;
    return (
      <FormCard currentScreen={currentScreen} screenNumber={screenNumber}>
        <FormCardHeader>Analysis for Implementation</FormCardHeader>
        <FormCardContent />
        <FormCardFooter />
      </FormCard>
    );
  }
}
