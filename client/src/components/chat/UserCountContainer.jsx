import React, { Component } from 'react';
import User from './User.jsx';
class UserCountContainer extends Component {


  // {chat.usersOnline.map( (user) => {
  //   return <User key={user.id} content={user.usersOnline}/></h1>
  // })}

  render() {
    const { chat } = this.props;
    return (
      <div className='user-count-container'>
        <ul className='user-list'>
          <h1>USERS</h1>
          </ul>
        </div>
    )
  }
}

export default UserCountContainer;

// Use User.jsx and map all users horizontally
// user count is temporary
