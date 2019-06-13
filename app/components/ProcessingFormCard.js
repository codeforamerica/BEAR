// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

type Props = {};

export default class ProcessingFormCard extends Component<Props> {
  render() {
    return (
      <FormCard>
        <FormCardHeader>Preparing your files</FormCardHeader>
        <FormCardContent />
        <FormCardFooter />
      </FormCard>
    );
  }
}
