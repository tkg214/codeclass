import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageListContainer extends Component {

  render() {
    const { chat } = this.props;
    return (
      <div className="message-list-container">
        {chat.messages.map( (message) => {
          console.log(message);
          return <Message key={message.id} content={message.content}/>
        })}
      </div>
    )
  }
}

export default MessageListContainer;

// use Message.jsx and map messages in list
