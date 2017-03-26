import React, { Component } from 'react';

class Terminal extends Component {

  componentDidUpdate() {
    this.outputsEnd.scrollIntoView({behaviour: "smooth"});
  } 
  
  render() {
    return (
      <div className='terminal'>
        <div className='output-container'>
          {this.props.terminal.map((outputs) => {
            if (outputs.response.stderr) {
              return <pre key={outputs.timestamp}>{outputs.response.stderr}</pre>
            }
            if (outputs.response.stdout) {
              return <pre key={outputs.timestamp}> > {outputs.response.stdout}</pre>
            }
          })}
        </div>
        <div ref={(el) => { this.outputsEnd = el; }}></div>
      </div>
    )
  }
}

export default Terminal;

// Terminal not styled yet. This component only shows the state change. It is very dumb :)
