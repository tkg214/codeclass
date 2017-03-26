import React, { Component } from 'react';

class Message extends Component {
  render () {
    return (
      <div>
        {this.props.content}
      </div>
    )
  }
}

export default Message;
