import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../auth-provider'

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id username email createdAt token
      }
  }
`

const Register = props => {
  const { dispatch } = React.useContext(AuthContext)
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = React.useState({})
  const onChange = event => {
    setValues({...values, [event.target.name]: event.target.value})
  }
  
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(cache, result) {
      const userData = result.data.register
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
    addUser()
  }
  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button type="submit" primary>
          Register
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

export default Register