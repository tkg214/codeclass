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
            <p>--- Users online ---</p>
          </article>
          <section className='user-list'>
            {users.usersOnline.map((user) => {
              return <User key={user.id} avatar={user.avatar} name={user.name}></User>
            })}
            <article className="user-container">
              <img className="online-user-avatar" src="https://avatars0.githubusercontent.com/u/23545041?v=3&s=400"/>
              <p>Chunk</p>
            </article>
            <article className="user-container">
              <img className="online-user-avatar" src="https://avatars1.githubusercontent.com/u/24704531?v=3&s=400"/>
              <p>Ken</p>
            </article>
            <article className="user-container">
              <img className="online-user-avatar" src="https://avatars0.githubusercontent.com/u/17226019?v=3&s=400"/>
              <p>Danton</p>
            </article>
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
