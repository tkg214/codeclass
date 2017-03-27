import React, { Component } from 'react';

class MessageComposeContainer extends Component {

  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  render() {

    return (
      <div className='message-compose-container'>
        <textarea
          className="chatbar-message"
          placeholder="Chat Bar"
          onKeyUp={this._onKeyUp.bind(this)}
          value={this.state.input}
          onChange={this._handleChange.bind(this)}
          />
        <button onClick={this._handleSubmit.bind(this)} className="btn btn-default btn-sm chatbar-button">Send</button>
      </div>
    )
  }

  _handleChange(e) {
    this.setState({input: e.target.value})
  }

  _onKeyUp(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.actions.sendMessage(e.target.value);
      this.setState({input: ''});
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.actions.sendMessage(this.state.input);
    this.setState({input: ''})
  }
}

export default MessageComposeContainer;
