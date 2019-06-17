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
  render() {
    const { onCountySelect, onCountyConfirm, selectedCounty } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Proposition 64 CA DOJ data upload</FormCardHeader>
        <FormCardContent>
          <CountySelect
            onCountySelect={onCountySelect}
            selectedCounty={selectedCounty.code}
          />
        </FormCardContent>
        <FormCardFooter>
          <ContinueButton
            onContinue={onCountyConfirm}
            disabled={selectedCounty.code === ''}
          />
        </FormCardFooter>
      </FormCard>
    );
  }
}
