const initialState = ''

export const setFilter = (text) => {
  return {
    type: 'SET_FILTER',
    text: text
  }
}

const filterReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.text
    default:
      return state
  }
}

export default filterReducer