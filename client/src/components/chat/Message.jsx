import React, { Component } from 'react';

class Message extends Component {

  render () {
    const { message } = this.props;
    const messageClass = message.isOwnMessage ? 'own' : 'other';

    return (
      <article className={'message-container-' + messageClass}>
        <article className={'bubble-chat' + messageClass}>
          {message.name}<br></br>
          {message.content}<br></br>
          {message.timestamp}
        </article>
        <img src={message.avatarurl} className={'user-avatar-' + messageClass}></img>
      </article>
    )
  }
}

export default Message;


// TODO add nullcheck for avatar
// TODO timestamp might be off based on locale, should use moment.js here instead of server
