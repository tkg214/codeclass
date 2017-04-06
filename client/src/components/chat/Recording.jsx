import React, { Component, PropTypes } from 'react';

class Recording extends Component {

  render() {
    const { id, time, timestamp, isAuthorized } = this.props;

    return (
      <li id={id}><a onClick={this._handleClick.bind(this)}>
        {timestamp}&ensp;|&ensp;{time}&ensp;</a>
        {isAuthorized && <i className='fa fa-trash-o' onClick={this._handleTrashClick.bind(this)}></i>}
      </li>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props._selectRecording(e.target.parentElement.id);
  }

  _handleTrashClick(e) {
    e.preventDefault();
    this.props._deleteRecording(e.target.parentElement.id);
  }
}

Recording.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  _selectRecording: PropTypes.func.isRequired,
  _deleteRecording: PropTypes.func.isRequired
}

export default Recording;
