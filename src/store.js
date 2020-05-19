import React from 'react'
import jwtDecode from 'jwt-decode'

import authReducer from './reducer'

export const StoreContext = React.createContext({
  user: null,
  login: (data) => {},
  logout: () => {}
})

const initialState = {
  user: null
}

if (localStorage.getItem('jwtToken')) {
  const token = jwtDecode(localStorage.getItem('jwtToken'))
  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    console.log('token == ', token)
    initialState.user = token
  }
}

const Store = props => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  const login = userData => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({type: 'LOGIN', payload: userData})
  }
  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({type: 'LOGOUT'})
  }
  return (
    <StoreContext.Provider value={{user: state.user, login, logout}}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default Store
