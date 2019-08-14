import React from 'react';
export default class Emoji extends React.Component {
  render () {
    let { content, title, emoji, css } = this.props;
    if (emoji) {
      content = emoji.content
      title = emoji.description
    }
    return (
      <span className={"title " + css} role="img" aria-label="flag" title={title}>{ content }</span>
    )
  }
}