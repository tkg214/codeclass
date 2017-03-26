function messages(state = [], action) {
  console.log(state, action);
  console.log("i see you!");
  return state;
}

export default messages;

// reducer takes in an action, and copy of current state
