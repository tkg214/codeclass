import React, { Component } from 'react';

class Message extends Component {
  render () {
    return (
      <div className="bubble">
        UserName<br></br>
        {this.props.content}
      </div>
    )
  }
}

export default Message;
