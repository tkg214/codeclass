import React, { Component, PropTypes } from 'react';

class User extends Component {

  render () {
    const { avatar, name } = this.props;

    return (
      <div className="user-container">
       <img className="online-user-avatar" src={avatar}/>
       <p>{name}</p>
      </div>
    )
  }
}

User.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default User;
