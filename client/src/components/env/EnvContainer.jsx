import React, { Component, PropTypes } from 'react';
import GistContainer from './GistContainer.jsx';
import EditorContainer from './EditorContainer.jsx';
import Terminal from './Terminal.jsx';
import EnvControls from './EnvControls.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/editor';

class EnvContainer extends Component {

  render() {
    const { editor, roomControls, gist, actions, terminal } = this.props;
    return (
      <div className='env-container'>
        <div className='env-nav-container'>
          <div className='row'>
            <GistContainer
              actions={actions}
              saveStatus={gist.saveStatus}
              language={roomControls.language}
              editorValue={editor.editorValue}
              isAuthorized={roomControls.isAuthorized}
              isChatLocked={roomControls.isChatLocked}
              isEditorLocked={roomControls.isEditorLocked} />
          </div>
        </div>
        <EditorContainer
          actions={actions}
          roomID={roomControls.roomID}
          editorValue={editor.editorValue}
          language={roomControls.language}
          isEditorLocked={roomControls.isEditorLocked}
          fontSize={roomControls.userSettings.fontSize}
          isAuthorized={roomControls.isAuthorized}
          theme={roomControls.userSettings.theme}/>
        <EnvControls
              actions={actions}
              editorValue={editor.editorValue}
              isAuthorized={roomControls.isAuthorized}
              isChatLocked={roomControls.isChatLocked}
              isEditorLocked={roomControls.isEditorLocked}
              roomID={roomControls.roomID}
              language={roomControls.language}
              theme={roomControls.userSettings.theme}
              fontSize={roomControls.userSettings.fontSize}/>
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
    gist: state.gist,
    recordings: state.recordings
   }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(Actions, dispatch) }
}

EnvContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
  roomControls: PropTypes.object.isRequired,
  gist: PropTypes.object.isRequired,
  terminal: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvContainer);
