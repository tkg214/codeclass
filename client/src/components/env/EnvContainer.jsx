import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {

    const { editorValues, dispatch } = this.props
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <GistContainer/>
          <button className='btn btn-primary btn-sm'>Run</button>
        </div>
        <EditorContainer actions={actions} />
        <Terminal/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    editorValues: state.editorValues
  }
}

export default connect(mapStateToProps)(EnvContainer);
