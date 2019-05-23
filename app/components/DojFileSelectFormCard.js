// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

type Props = {
  currentScreen: number,
  countyName: string
};

const screenNumber = 2;

export default class DojFileSelectFormCard extends Component<Props> {
  render() {
    const { currentScreen, countyName } = this.props;
    return (
      <FormCard currentScreen={currentScreen} screenNumber={screenNumber}>
        <FormCardHeader>
          {countyName} Proposition 64 CA DOJ data upload
        </FormCardHeader>
        <FormCardContent />
        <FormCardFooter />
      </FormCard>
    );
  }
}
