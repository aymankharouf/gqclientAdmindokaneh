import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem('jwtToken') ? `Bearer ${localStorage.getItem('jwtToken')}` : ''
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const AppProvider = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default AppProvider