const initialState = ''

export const setNoti = (msg, time) => {
  const seconds = time*1000
  return async dispatch => {
    dispatch({ type:'SET', message:msg })
    setTimeout(function () {
      dispatch({ type:'CLEAR' })
    }, seconds)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export default notificationReducer