// @flow
import React, { Component } from 'react';
import styles from './EmojiMediaBox.css';

type Props = {
  className: string,
  emojiClass: string,
  title: string,
  content: string
};

export default class EmojiMediaBox extends Component<Props> {
  render() {
    const { className, emojiClass, title, content } = this.props;
    return (
      <div className={`${className} media-box`}>
        <div className="media-box__media media--icon">
          <div className={`emoji emoji--med ${emojiClass}`} />
        </div>
        <div className={`${styles.emojiMediaContent} media-box__content`}>
          <p>
            <b>{title}: </b>
            {content}
          </p>
        </div>
      </div>
    );
  }
}
