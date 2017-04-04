import React, { Component, PropTypes } from 'react';

class Message extends Component {

  render () {
    const { message } = this.props;
    const messageClass = message.isOwnMessage ? 'own' : 'other';

    return (
      <article className={'message-container-' + messageClass}>
        <article className={'bubble-chat bubble-chat-' + messageClass}>
          <p>{message.content}</p>
          <p className="message-timestamp">{message.timestamp}</p>
        </article>
        <img src={message.avatarurl} className={'chat-avatar chat-avatar-' + messageClass}></img>
      </article>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired
}

export default Message;


// TODO add nullcheck for avatar
// TODO timestamp might be off based on locale, should use moment.js here instead of server
