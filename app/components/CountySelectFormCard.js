// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import CountySelect from './CountySelect';

type Props = {
  onCountySelect: County => void,
  onCountyConfirm: () => void
};

export default class CountySelectFormCard extends Component<Props> {
  render() {
    const { onCountySelect, onCountyConfirm } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Proposition 64 CA DOJ data upload</FormCardHeader>
        <FormCardContent>
          <CountySelect onCountySelect={onCountySelect} />
        </FormCardContent>
        <FormCardFooter>
          <button
            className="button button--primary"
            onClick={onCountyConfirm}
            type="button"
          >
            Continue <i className="icon-arrow_forward" />
          </button>
        </FormCardFooter>
      </FormCard>
    );
  }
}
