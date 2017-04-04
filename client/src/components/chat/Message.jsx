import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Message extends Component {

  render () {
    const { message } = this.props;
    const messageClass = message.isOwnMessage ? 'own' : 'other';

    return (
      <article className={'message-container-' + messageClass}>
        <article className={'bubble-chat bubble-chat-' + messageClass}>
          <p>{message.content}</p>
          <p className="message-timestamp">
            {moment(message.timestamp).diff(moment(), 'days') < -2 ? moment(message.timestamp).format('MMM Do YYYY') : moment(message.timestamp).fromNow()}
          </p>
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
