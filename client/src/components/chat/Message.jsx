import React, { Component } from 'react';

class Message extends Component {

  render () {
    const { message } = this.props;
    const messageClass = message.isOwnMessage ? 'own-message' : 'message';

    // TODO style messages
    return (
      <div className='message-container'>
        <div className={'bubble-' + messageClass}>
          {message.name}<br></br>
          {message.content}<br></br>
          {message.timestamp}
        </div>
        <img src={message.avatarurl} className={'user-avatar-' + messageClass}></img>
      </div>
    )
  }
}

export default Message;


// TODO add nullcheck for avatar
// TODO timestamp might be off based on locale, should use moment.js here instead of server
