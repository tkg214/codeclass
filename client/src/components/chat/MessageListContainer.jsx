import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageListContainer extends Component {

  render() {
    const { chat } = this.props;
    // console.log(chat.messages);
    // console.log(message);
    return (
      <div className="message-list-container">
        {chat.messages.map( (message) => {

          return <Message key={message.timestamp} content={message.content}/>
        })}
      </div>
    )
  }
}

export default MessageListContainer;

// use Message.jsx and map messages in list
