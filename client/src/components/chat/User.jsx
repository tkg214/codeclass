import React, { Component } from 'react';

class User extends Component {
  render () {
    return (
      <li>
      <div className="user-container">
       <img className="online-user-avatar" src={this.props.avatar}/>
       <br></br>
       <p>{this.props.name}</p>
      </div>
    </li>
    )
  }
}

export default User;
