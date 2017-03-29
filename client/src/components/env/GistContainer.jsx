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
      <div className='col-lg-6'>
        <div className='input-group gist-container'>
          <input
            type='text'
            placeholder='Enter Gist Name'
            onChange={this._handleChange.bind(this)}
            value={this.state.input}
            className='form-control input-sm'/>
          <span className='input-group-btn'>
            <button
              className='btn btn-primary btn-sm gist-button'
              onClick={this._handleClick.bind(this)}
              type='button'>Save
            </button>
          </span>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.actions.saveToGist(this.state.input, this.props.editor, this.props.language)
    this.setState({input: ''})
  }

  _handleChange(e) {
    this.setState({input: e.target.value})
  }
}

export default GistContainer;
