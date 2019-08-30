// @flow
import React, { Component } from 'react';

type Props = {
  onContinue: () => void,
  disabled: boolean
};

export default class ContinueButton extends Component<Props> {
  classes = () => {
    const buttonClasses = 'button button--primary';

    const { disabled } = this.props;
    if (disabled) {
      return buttonClasses.concat(' button--disabled');
    }
    return buttonClasses;
  };

  render() {
    const { onContinue, disabled } = this.props;
    return (
      <button
        className={this.classes()}
        onClick={onContinue}
        type="button"
        id="continue"
        disabled={disabled}
      >
        Continue <i className="icon-arrow_forward" />
      </button>
    );
  }
}
