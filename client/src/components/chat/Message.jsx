import React, { Component } from 'react';

class Message extends Component {
  render () {
    return (
      <div className="bubble">
        {this.props.name}<br></br>
        {this.props.content}
      </div>
    )
  }
}

export default Message;
