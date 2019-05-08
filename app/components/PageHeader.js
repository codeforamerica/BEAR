import React, { Component } from 'react';

export default class PageHeader extends Component<Props, State> {
  render() {
    return (
      <header className="main-header">
        <div className="toolbar">
          <div className="main-header__title">Clear My Record</div>
        </div>
      </header>
    );
  }
}
