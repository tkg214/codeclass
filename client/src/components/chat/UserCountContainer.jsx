import React, { Component } from 'react';
import User from './User.jsx';
class UserCountContainer extends Component {


  // {chat.usersOnline.map( (user) => {
  //   return <User key={user.id} content={user.usersOnline}/></h1>
  // })}

  render() {
    const { users } = this.props;
    return (
      <div className='online-users-container'>
        <h2>Users online:</h2>
        <div className='user-list'>
          {users.usersOnline.map((user) => {
            return <User key={user.id} avatar={user.avatar} name={user.name}></User>
          })}
        </div>
      </div>
    )
  }
}

export default UserCountContainer;

// Use User.jsx and map all users horizontally
// user count is temporary
