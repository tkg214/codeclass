import React, { Component } from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/terminal';
import 'brace/theme/solarized_light';
import 'brace/theme/solarized_dark';

import 'brace/ext/language_tools';

class EditorContainer extends Component {

  constructor() {
    super();
    this.width = $(window).width() - $('.chat-container').width();
  }

  render() {
    const { editor, roomControls } = this.props;
    // Prevent looking for rooms/mode-mode.js or rooms/theme-theme as html
    // if (!roomControls.language || !roomControls.userSettings.theme) return null;
    return (
      <div className='editor-container'>
        <AceEditor
          className ='editor'
          mode={roomControls.language}
          theme={roomControls.userSettings.theme}
          fontSize={30}
          onChange={this._onChange.bind(this)}
          width={`${this.width}`}
          value={editor}
          readOnly={roomControls.isEditorLocked}
        />
      </div>
    )
  }

  _onChange(newValue) {
    this.props.actions.updateEditorValues(newValue)
  }
}

EditorContainer.propTypes = {
  roomControls: React.PropTypes.shape({
    language: React.PropTypes.string.isRequired,
    isEditorLocked: React.PropTypes.bool.isRequired,
    userSettings: React.PropTypes.shape({
      theme: React.PropTypes.string.isRequired
    })
  }),
  editor: React.PropTypes.string,
  actions: React.PropTypes.object
}

export default EditorContainer;
