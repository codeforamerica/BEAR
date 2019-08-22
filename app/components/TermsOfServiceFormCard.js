import React, { Component } from 'react';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import GoBackButton from './GoBackButton';

type Props = {
  onBack: () => void
};

export default class TermsOfServiceFormCard extends Component<Props> {
  render() {
    const { onBack } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Terms of Service</FormCardHeader>
        <FormCardContent>
          <h1>Needs Copy</h1>
        </FormCardContent>
        <FormCardFooter>
          <div className="text--centered">
            <GoBackButton onGoBack={onBack} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}
