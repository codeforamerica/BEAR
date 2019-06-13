// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

type Props = {
  county: string
};

export default class ResultsFormCard extends Component<Props> {
  render() {
    const { county } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Your files are ready!</FormCardHeader>
        <FormCardContent>
          <div>
            {`We have generated results for ${county} county`}
            <button
              className="button button--primary"
              type="button"
              id="view_results"
            >
              Open Folder
            </button>
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
