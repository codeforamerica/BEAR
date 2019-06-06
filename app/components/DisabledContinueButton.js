import React, { Component } from 'react';

export default class DisabledContinueButton extends Component<Props> {
  render() {
    return (
      <div>
        <button
          className="button button--primary button--disabled"
          type="button"
        >
          Continue <i className="icon-arrow_forward" />
        </button>
      </div>
    );
  }
}
