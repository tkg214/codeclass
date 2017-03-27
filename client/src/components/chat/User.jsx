import React, { Component } from 'react';

class User extends Component {
  render () {
    return (
      <div>
        <li>
        {this.props.content + ' '}
        </li>
      </div>
    )
  }
}

export default User;
