import React, { Component } from 'react';
import User from './User.jsx';
class UserCountContainer extends Component {


  render() {
    const { chat } = this.props;
    console.log('object', chat)
    return (
      <div className='user-count-container'>
        <ul className='user-list'>
          {chat.usersOnline.map( (user) => {
            return <User key={user.id} content={user.usersOnline}/>
          })}
          </ul>
        </div>
    )
  }
}

export default UserCountContainer;

// Use User.jsx and map all users horizontally
// user count is temporary
