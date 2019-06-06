import React, { Component } from 'react';

type Props = {
  onContinue: () => {}
};

export default class ContinueButton extends Component<Props> {
  render() {
    const { onContinue } = this.props;
    return (
      <div>
        <button
          className="button button--primary"
          onClick={onContinue}
          type="button"
          id="continue"
        >
          Continue <i className="icon-arrow_forward" />
        </button>
      </div>
    );
  }
}
