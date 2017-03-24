import React, { Component } from 'react';

class GistContainer extends Component {

  render() {
    return (
      <div className='form-group gist-container'>

        <div className='input-group'>
          <input type='text' placeholder='Enter Gist Name' className='form-control'/>
          <button className='btn btn-primary btn-sm' type='button'>Save</button>
        </div>
      </div>
    )
  }
}

export default GistContainer;
