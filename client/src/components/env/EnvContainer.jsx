import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {
  render() {
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <GistContainer/>
          <button className='btn btn-primary btn-sm'>Run</button>
        </div>
        <EditorContainer actions={this.props.actions} editor={this.props.editor.value}/>
        <Terminal />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { editor: state.editor }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvContainer);
