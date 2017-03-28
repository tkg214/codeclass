import axios from 'axios';
export function getToken() {
  return dispatch => {
    console.log("dispatching getToken()");
    axios.get('/api/get_token')
    .then(function (response) {
      if (response.error) {
        throw new Error(response.error);
      }
      console.log(response);
      dispatch({type: 'RECEIVE_TOKEN', meta: {remote: true}, payload: { token : response.data}});
    })
    .catch(function (error) {
      dispatch({type: 'RECEIVE_TOKEN_ERROR', meta: {remote: true}, payload: {error}});
    });
  }
}
