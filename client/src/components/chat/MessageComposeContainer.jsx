import React, {Component} from 'react';

class MessageComposeContainer extends Component {

  render() {
    return (
      <div className='message-compose-container'>
          <textarea className="chatbar-message" placeholder="Chat Bar"/>
          <button type="button" className="btn btn-default btn-lg chatbar-button">Send</button>
      </div>
    )
  }
}

export default MessageComposeContainer;
