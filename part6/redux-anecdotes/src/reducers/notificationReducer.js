const initialState = ''

export const setNoti = (msg) => {
  return {
    type: 'SET',
    message: msg
  }
}

export const clearNoti = () => {
  return {
    type: 'CLEAR'
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