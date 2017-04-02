import React, { Component, PropTypes } from 'react';

class User extends Component {

  render () {
    const { avatar, name } = this.props;

    return (
      <article className="user-container">
       <img className="online-user-avatar" src={avatar}/>
       <section className="github-info">
        <p>{name}</p>
        <a href={`https://github.com/${this.props.name}`}><i className="fa fa-github" aria-hidden="true"></i></a>
       </section>
      </article>
    )
  }
}

User.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default User;
