import React, { Component, PropTypes } from 'react';
import AceEditor from 'react-ace';

import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/ruby';
import 'brace/mode/python';

//As a default setting
import 'brace/mode/markdown';

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
    let w = $(window).width() - $('.chat-contaidner').width();
    this.width = w.toString();
  }

  render() {
    const { editorValue, language, theme, isEditorLocked, fontSize, isAuthorized } = this.props;

    let editorStatus;
    if (isAuthorized) {
      editorStatus = false;
    } else if (isAuthorized && !isEditorLocked) {
      editorStatus = false;
    } else {
      editorStatus = true;
    }

    return (
      <div className='editor-container'>
        <AceEditor
          className ='editor'
          mode={language}
          theme={theme}
          fontSize={fontSize}
          onChange={this._onChange.bind(this)}
          width={this.width}
          value={editorValue}
          readOnly={editorStatus}
        />
      </div>
    )
  }

  _onChange(newValue) {
    this.props.actions.updateEditorValues(newValue, this.props.roomID)
  }
}

EditorContainer.propTypes = {
  actions: PropTypes.shape({
    updateEditorValues: PropTypes.func.isRequired
  }),
  language: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  editorValue: PropTypes.string.isRequired,
  roomID: PropTypes.number.isRequired,
  isEditorLocked: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired
}

export default EditorContainer;
