export default function reducer(state={
  currentTab: 0
}, action) {
  switch(action.type){
    case 'SWITCH_SIDEBAR_TAB': {
        return {...state, currentTab: action.payload.currentTab}
    }
  }
  return state;
}