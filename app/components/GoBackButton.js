import React, { Component } from 'react';

type Props = {
  onGoBack: () => {}
};

export default class GoBackButton extends Component<Props> {
  render() {
    const { onGoBack } = this.props;
    return (
      <div>
        <button className="button" onClick={onGoBack} type="button" id="goback">
          Go back <i className="icon-replay" />
        </button>
      </div>
    );
  }
}
