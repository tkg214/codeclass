import React, { Component, PropTypes } from 'react';

class Recording extends Component {

  render() {
    const { id, time, timestamp } = this.props;

    return (
      <li><a id={id} onClick={this._handleClick.bind(this)}>{timestamp}&ensp;|&ensp;{time}</a></li>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props._selectRecording(e.target.id);
  }
}

Recording.propTypes = {
  id: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  _selectRecording: PropTypes.func.isRequired
}

export default Recording;
