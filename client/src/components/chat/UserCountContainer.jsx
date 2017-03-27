import React, { Component } from 'react';

class UserCountContainer extends Component {

  render() {
    const { chat } = this.props;
    console.log(chat.usersOnline.usersOnline);
    return (
      <div className='user-count-container'>
        {chat.usersOnline.usersOnline}
      </div>
    )
  }
}

export default UserCountContainer;

// Use User.jsx and map all users horizontally
