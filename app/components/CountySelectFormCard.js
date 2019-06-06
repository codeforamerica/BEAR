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
  selectedCounty: County,
  onCountySelect: County => void,
  onCountyConfirm: void => void
};

export default class CountySelectFormCard extends Component<Props> {
  onContinue = () => {
    const { selectedCounty, onCountyConfirm } = this.props;
    if (selectedCounty.code !== '') {
      onCountyConfirm();
    }
  };

  render() {
    const { onCountySelect } = this.props;
    return (
      <FormCard>
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
