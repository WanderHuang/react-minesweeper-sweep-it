import React from 'react';
export default class Emoji extends React.Component {
  render () {
    let { content, title, emoji, css, onClick } = this.props;
    if (emoji) {
      content = emoji.content
      title = emoji.description
    }
    return (
      <span
        className={"title " + css}
        style={{cursor: onClick ? 'pointer': 'default'}}
        role="img"
        aria-label="flag"
        title={ title }
        onClick={ onClick }
      >{ content }</span>
    )
  }
}