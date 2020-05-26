const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('jwtToken', action.payload.token)
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      localStorage.removeItem('jwtToken')
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

export default authReducer