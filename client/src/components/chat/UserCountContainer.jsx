import React, { Component, PropTypes } from 'react';
import User from './User.jsx';
class UserCountContainer extends Component {


  // {chat.usersOnline.map( (user) => {
  //   return <User key={user.id} content={user.usersOnline}/></h1>
  // })}

  render() {
    const { users } = this.props;
    return (
      <div className='online-users-container'>
        <section className='users-box'>
          <article className='sidebar-users-online-title'>
            <p><span>Users online</span></p>
          </article>
          <section className='user-list'>
            {users.usersOnline.map((user) => {
              return <User key={user.id} avatar={user.avatar} name={user.name}></User>
            })}
          </section>
        </section>
      </div>
    )
  }
}

UserCountContainer.propTypes = {
  users: PropTypes.object.isRequired
}

export default UserCountContainer;

// Use User.jsx and map all users horizontally
// user count is temporary
