import React, { Component } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import EnvControls from './EnvControls.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {
    let { editor, roomControls, gist, actions, terminal } = this.props;

    return (
      <div className='env-container'>
        <div className='env-nav-container row'>
          <GistContainer actions={actions} gist={gist} language={roomControls.language} editorValue={editor.editorValue}/>
          <EnvControls actions={actions} editorValue={editor.editorValue} roomControls={roomControls}/>
        </div>
        <EditorContainer actions={actions} editorValue={editor.editorValue} roomControls={roomControls}/>
        <Terminal terminal={terminal}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    editor: state.editor,
    roomControls: state.roomControls,
    terminal: state.terminal,
    gist: state.gist
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvContainer);
