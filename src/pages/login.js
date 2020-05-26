import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../auth-provider'

const LOGIN = gql`
  mutation login(
    $username: String!
    $password: String!) {
      login(
          username: $username
          password: $password
      ) {
        id username email createdAt token
      }
  }
`

const Login = props => {
  const { dispatch } = React.useContext(AuthContext)
  const [values, setValues] = React.useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({})
  const onChange = event => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  
  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, result) {
      const userData = result.data.login
      dispatch({type: 'LOGIN', payload: userData})
      props.history.push('/')
    }, 
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values
  })
  
  const onSubmit = event => {
    event.preventDefault()
    login()
  }
  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 ? 
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>
      : ''}
    </div>
  )
}

export default Login