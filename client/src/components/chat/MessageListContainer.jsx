import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageListContainer extends Component {

  render() {
    const { chat } = this.props;
    let mostRecentMessages = chat.messages[0] || [];
    return (
      <div className="message-list-container">
        {mostRecentMessages.map( (message) => {
            return <Message key={message.timestamp} content={message.content} name={message.name} avatarurl={message.avatarurl}/>
        })}
      </div>
    )
  }
}

export default MessageListContainer;
// for(var i = 0; i < message.length; i++){
//   console.log('MESSAGE LENGTH', message.length);
//   console.log("THESE ARE MESSAGES", message[i].content);

// use Message.jsx and map messages in list
