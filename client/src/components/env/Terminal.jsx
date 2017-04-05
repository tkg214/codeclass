import React, { Component, PropTypes } from 'react';

class Terminal extends Component {

  componentDidUpdate() {
    // this.outputsEnd.scrollIntoView({behaviour: "smooth"});
  }

  render() {

    const { terminal } = this.props;

    return (
      <div className='terminal'>
        <div classNAme='terminal-output-wrapper'>
          {terminal.map((outputs) => {
            if (outputs.response.stderr) {
              return <pre className='terminal-output' key={outputs.timestamp}>{outputs.response.stderr}</pre>
            }
            if (outputs.response.stdout) {
              return <pre className='terminal-output' key={outputs.timestamp}>{outputs.response.stdout}</pre>
            }
          })}
        </div>
      <div ref={(el) => { this.outputsEnd = el; }}></div>
      </div>
    )
  }
}

Terminal.propTypes = {
  terminal: PropTypes.array.isRequired
}

export default Terminal;

// Terminal not styled yet. This component only shows the state change. It is very dumb :)
