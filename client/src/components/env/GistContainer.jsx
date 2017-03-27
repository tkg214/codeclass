import React, { Component } from 'react';

class GistContainer extends Component {

  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  render() {
    const { gist } = this.props;

    return (
      <div className='form-group gist-container'>
        <div className='input-group'>
          <input
            type='text'
            placeholder='Enter Gist Name'
            onChange={this._handleChange.bind(this)}
            value={this.state.input}
            className='form-control'/>
          <button
            className='btn btn-primary btn-sm gist-button'
            onClick={this._handleClick.bind(this)}
            type='button'>Save</button>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.actions.saveToGist(this.state.input)
    this.setState({input: ''})
  }

  _handleChange(e) {
    this.setState({input: e.target.value})
  }
}

export default GistContainer;
