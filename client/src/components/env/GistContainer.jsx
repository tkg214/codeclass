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

    const buttonClass = {
      'Saving...': 'btn-warning',
      'Complete': 'btn-success',
      'Failed': 'btn-danger'
    }

    return (
      <div className='col-lg-12'>
        <div className='input-group gist-container'>
          <input
            type='text'
            placeholder='Enter Gist Name'
            onChange={this._handleChange.bind(this)}
            value={this.state.input}
            className='form-control input-sm'
            disabled={gist.save === 'isSaving'}/>

          <span className='input-group-btn'>
            <button
              className={'btn btn-sm gist-button ' + (buttonClass[gist.save] || 'btn-primary')}
              disabled={gist.save === 'isSaving'}
              onClick={this._handleClick.bind(this)}
              type='button'><i className="fa fa-github fa-lg"></i>&ensp;{(gist.save || 'Save')}
            </button>
          </span>
        </div>
      </div>
    )
  }

  _handleClick(e) {
    e.preventDefault();
    this.props.actions.saveToGist(this.state.input, this.props.editorValue, this.props.language)
  }

  _handleChange(e) {
    this.setState({input: e.target.value})
  }
}

export default GistContainer;
