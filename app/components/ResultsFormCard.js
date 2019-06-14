// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';

type Props = {
  county: County,
  outputFolder: string,
  openFolder: string => void
};

export default class ResultsFormCard extends Component<Props> {
  openResultsFolder = () => {
    const { openFolder, outputFolder } = this.props;
    openFolder(outputFolder);
  };

  render() {
    const { county } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          <div className="text--centered">
            Your files are ready!
            <p>{`We have generated results for ${county.name} county`}</p>
            <button
              className="button button--primary"
              type="button"
              id="view_results"
              onClick={this.openResultsFolder}
            >
              Open Folder
            </button>
          </div>
        </FormCardHeader>
        <FormCardContent />
        <FormCardFooter />
      </FormCard>
    );
  }
}
