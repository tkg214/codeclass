import React, { Component } from 'react';

class User extends Component {
  render () {
    return (
      <div className="user-container">
       <img className="online-user-avatar" src={this.props.avatar}/>
       <p>{this.props.name}</p>
      </div>
    )
  }
}

export default User;
