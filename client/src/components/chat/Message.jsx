import React, { Component } from 'react';

class Message extends Component {
  render () {
    return (
      <div className="bubble">
        <table>
        <tr><td>UserName</td></tr>
        <tr><td>
        {this.props.content}
        </td></tr>
      </table>
      </div>
    )
  }
}

export default Message;
