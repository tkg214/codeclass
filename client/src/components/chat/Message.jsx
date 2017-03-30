import React, { Component } from 'react';

class Message extends Component {

  render () {
    const { message } = this.props;

    return (
      <div>
        <div className="bubble">
          {message.name}<br></br>
          {message.content}<br></br>
          {message.timestamp}
        </div>
        <img src={message.avatarurl} className="user-avatar img-responsive"></img>
      </div>
    )
  }
}

export default Message;


// TODO add nullcheck for avatar
// TODO timestamp might be off based on locale, should use moment.js here instead of server
