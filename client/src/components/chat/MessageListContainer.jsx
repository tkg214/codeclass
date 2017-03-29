import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageListContainer extends Component {

  render() {
    const { chat } = this.props;
    console.log('THIS IS CHAT', chat);
    let mostRecentMessages = chat.messages[0] || [];
    console.log(mostRecentMessages);
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
