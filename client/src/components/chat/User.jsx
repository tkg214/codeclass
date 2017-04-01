import React, { Component } from 'react';

class User extends Component {
  render () {
    return (
      <article className="user-container">
       <img className="online-user-avatar" src={this.props.avatar}/>
       <section className="github-info">
        <p>{this.props.name}</p>
        <a href={`https://github.com/${this.props.name}`}><i className="fa fa-github" aria-hidden="true"></i></a>
       </section>
      </article>
    )
  }
}

export default User;
