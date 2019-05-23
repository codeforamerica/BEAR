// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import CountySelect from './CountySelect';
import ContinueButton from './ContinueButton';

type Props = {
  currentScreen: number,
  onCountySelect: County => void,
  onCountyConfirm: number => void
};

const screenNumber = 1;

export default class CountySelectFormCard extends Component<Props> {
  onContinue = () => {
    const { onCountyConfirm } = this.props;
    onCountyConfirm(screenNumber + 1);
  };

  render() {
    const { currentScreen, onCountySelect } = this.props;
    return (
      <FormCard currentScreen={currentScreen} screenNumber={screenNumber}>
        <FormCardHeader>Proposition 64 CA DOJ data upload</FormCardHeader>
        <FormCardContent>
          <CountySelect onCountySelect={onCountySelect} />
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton onContinue={this.onContinue} />
        </FormCardFooter>
      </FormCard>
    );
  }
}
