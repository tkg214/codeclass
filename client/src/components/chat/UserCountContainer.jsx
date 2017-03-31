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
        <div className='users-box'>
          <h2>Users online:</h2>
          <div className='user-list'>
            {users.usersOnline.map((user) => {
              return <User key={user.id} avatar={user.avatar} name={user.name}></User>
            })}
            <div className="user-container">
              <img className="online-user-avatar" src="https://avatars0.githubusercontent.com/u/23545041?v=3&s=400"/>
              <p>Chunk</p>
            </div>
            <div className="user-container">
              <img className="online-user-avatar" src="https://avatars1.githubusercontent.com/u/24704531?v=3&s=400"/>
              <p>Ken</p>
            </div>
            <div className="user-container">
              <img className="online-user-avatar" src="https://avatars0.githubusercontent.com/u/17226019?v=3&s=400"/>
              <p>Danton</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCountContainer;

// Use User.jsx and map all users horizontally
// user count is temporary
