import React from 'react'
import jwtDecode from 'jwt-decode'

import authReducer from './auth-reducer'

export const AuthContext = React.createContext()

const initialState = {
  user: null
}

if (localStorage.getItem('jwtToken')) {
  const token = jwtDecode(localStorage.getItem('jwtToken'))
  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = token
  }
}

const AuthProvider = props => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
