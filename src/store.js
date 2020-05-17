import React from 'react'

export const AuthContext = React.createContext({
  user: null,
  login: (data) => {},
  logout: () => {}
})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

const Store = props => {
  const [state, dispatch] = React.useReducer(authReducer, { user: null })
  const login = userData => {
    dispatch({type: 'LOGIN', payload: userData})
  }
  const logout = () => {
    dispatch({type: 'LOGOUT'})
  }
  return (
    <AuthContext.Provider value={{user: state.user, login, logout}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default Store
