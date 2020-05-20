import React from 'react'
import jwtDecode from 'jwt-decode'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

import authReducer from './reducer'

export const StoreContext = React.createContext()

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

const NEW_POST_SUBSCRIPTION = gql`
  subscription {
    newPost {
      id body createdAt username likesCount
    }
  }
`

const Store = props => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  //const [newPost, { error }] = useSubscription(NEW_POST_SUBSCRIPTION)
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default Store
