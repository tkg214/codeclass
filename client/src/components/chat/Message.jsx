import React, { Component } from 'react';

class Message extends Component {
  render () {
    return (
      <div>
        <div className="bubble">
          {this.props.name}<br></br>
          {this.props.content}
        </div>
        <img src={this.props.avatarurl} className="user-avatar img-responsive"></img>
      </div>
    )
  }
}

export default Message;
