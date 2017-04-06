import React, { Component, PropTypes } from 'react';
import Recording from './Recording.jsx';

class RecordingsListContainer extends Component {

  render() {
    const { recordings, isAuthorized } = this.props;
    let recordingsArray = recordings.recordings[0] || [];

    return (
        <ul className="rec-list">
          {recordingsArray.map((recording) => {
            return <Recording key={recording.id}
                              isAuthorized={isAuthorized}
                              id={recording.id}
                              time={recording.time}
                              timestamp={recording.timestamp}
                              _deleteRecording={this._deleteRecording.bind(this)}
                              _selectRecording={this._selectRecording.bind(this)}/>
          })}
        </ul>
    )
  }

  _selectRecording(id) {
    this.props.actions.selectRecording(id)
  }

  _deleteRecording(id) {
    this.props.actions.deleteRecording(id);
  }
}

export default RecordingsListContainer;

RecordingsListContainer.propTypes = {
  actions: PropTypes.shape({
    selectRecording: PropTypes.func.isRequired,
    deleteRecording: PropTypes.func.isRequired
  }),
  recordings: PropTypes.object.isRequired,
  isAuthorized: PropTypes.bool.isRequired
}
