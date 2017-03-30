import React, { Component } from 'react';
import User from './User.jsx';
class UserCountContainer extends Component {

  render() {
    const { users } = this.props;

    return (
      <div className='online-users-container'>
        <div className='users-box'>
          <div className='user-list'>
            <ul>

            {users.usersOnline.map((user) => {
              return <User key={user.id} avatar={user.avatar} name={user.name}></User>
            })}
          </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCountContainer;
