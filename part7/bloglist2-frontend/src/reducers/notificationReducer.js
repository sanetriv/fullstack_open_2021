const initialState = null

let timeoutId

export const setNoti = (msg, time) => {
  const seconds = time*1000
  return async dispatch => {
    dispatch({ type:'CLEAR' })
    clearTimeout(timeoutId)
    dispatch({ type:'SET', message:msg })
    timeoutId = setTimeout(function () {
      dispatch({ type:'CLEAR' })
    }, seconds)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.message
  case 'CLEAR':
    return null
  default:
    return state
  }
}

export default notificationReducer