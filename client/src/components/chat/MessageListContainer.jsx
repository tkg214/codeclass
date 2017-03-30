import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageListContainer extends Component {

  render() {
    const { chat } = this.props;
    let mostRecentMessages = chat.messages[0] || [];
    
    return (
      <div className="message-list-container">
        {mostRecentMessages.map( (message) => {
            return <Message key={message.id} message={message}/>
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
