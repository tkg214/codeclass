import React, { Component } from 'react';

class User extends Component {
  render () {
    return (
      <div className="user-container">
       <img className="online-user-avatar" src={this.props.avatar}/>
       <div className="github-info">
        <p>{this.props.name}</p>
        <a href={`https://github.com/${this.props.name}`}><i className="fa fa-github" aria-hidden="true"></i></a>
       </div>
      </div>
    )
  }
}

export default User;
