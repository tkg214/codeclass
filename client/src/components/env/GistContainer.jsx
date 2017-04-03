import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class GistContainer extends Component {

  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  render() {
    const { saveStatus, isAuthorized, isChatLocked, isEditorLocked } = this.props;
    const buttonClass = {
      'Saving...': {'style': 'btn-warning', 'icon': 'fa-spin fa-spinner fa-pulse'},
      'Complete': {'style': 'btn-success', 'icon': 'fa-check'},
      'Failed': {'style': 'btn-danger', 'icon': 'fa-x'},
      'Save': {'style': 'btn-primary', 'icon': 'fa-github'}
    }

    const key = saveStatus;

    return (
      <div className='col-lg-12 gist-run-container'>
        <div className='gist-container'>
          <input
            type='text'
            placeholder='Enter Gist Name'
            onChange={this._handleChange.bind(this)}
            value={this.state.input}
            className='gist-input'
            disabled={saveStatus === 'Saving...'}/>

            <ReactCSSTransitionGroup
               transitionName="example"
               transitionEnterTimeout={250}
               transitionLeaveTimeout={250}>
               <button
                 key = {key}
                 className={'btn btn-sm gist-button ' + buttonClass[saveStatus].style}
                 disabled={saveStatus === 'Saving...'}
                 onClick={this._handleClick.bind(this)}
                 type='button'><i className={'fa fa-lg ' + buttonClass[saveStatus].icon}></i>&ensp;{saveStatus}
              </button>
            </ReactCSSTransitionGroup>
        </div>
        <div className='run-container'>
          {(isAuthorized || !isEditorLocked) &&
            <div onClick={this._onRunClick.bind(this)} className='run-btn'><i className='fa fa-play'></i>&ensp;Run</div>
          }
          {(!isAuthorized && isEditorLocked) &&
            <div className='run-btn'><i className='fa fa-play'></i>&ensp;Run</div>
          }
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

  _onRunClick(e) {
    e.preventDefault();
    this.props.actions.executeCode(this.props.language, this.props.editorValue);
  }
}

GistContainer.propTypes = {
  actions: PropTypes.shape({
    saveToGist: PropTypes.func.isRequired,
    executeCode: PropTypes.func.isRequired
  }),
  saveStatus: PropTypes.string.isRequired,
  editorValue: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  roomID: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isChatLocked: PropTypes.bool.isRequired,
  isEditorLocked: PropTypes.bool.isRequired
}

export default GistContainer;
