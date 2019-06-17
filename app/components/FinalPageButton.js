import React, { Component } from 'react';

type Props = {
  onFinalPage: () => {}
};

export default class FinalPageButton extends Component<Props> {
  render() {
    const { onFinalPage } = this.props;
    return (
      <button className="button" onClick={onFinalPage} type="button" id="start_over">
        FinalPage
      </button>
    );
  }
}
