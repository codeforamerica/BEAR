// @flow
import React, { Component } from 'react';

type Props = {
  onGoBack: () => void
};

export default class GoBackButton extends Component<Props> {
  render() {
    const { onGoBack } = this.props;
    return (
      <button className="button" onClick={onGoBack} type="button" id="goback">
        Go back <i className="icon-replay" />
      </button>
    );
  }
}
