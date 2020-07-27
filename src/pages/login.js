import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { f7, Page, Navbar, List, ListInput, Button, Link, Toolbar } from 'framework7-react'
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
  const [password, setPassword] = React.useState('')
  const [mobile, setMobile] = React.useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('')
  const [mobileErrorMessage, setMobileErrorMessage] = React.useState('')
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    const patterns = {
      password: /^.{4}$/,
    }
    const validatePassword = (value) => {
      if (patterns.password.test(value)){
        setPasswordErrorMessage('')
      } else {
        setPasswordErrorMessage(labels.invalidPassword)
      }
    }
    if (password) validatePassword(password)
  }, [password])
  React.useEffect(() => {
    const patterns = {
      mobile: /^07[7-9][0-9]{7}$/
    }
    const validateMobile = (value) => {
      if (patterns.mobile.test(value)){
        setMobileErrorMessage('')
      } else {
        setMobileErrorMessage(labels.invalidMobile)
      }
    }
    if (mobile) validateMobile(mobile)
  }, [mobile])
  React.useEffect(() => {
    if (error) {
      showError(error)
      setError('')
    }
  }, [error])
  React.useEffect(() => {
    if (loading) {
      f7.dialog.preloader(labels.inprocess)
    } else {
      f7.dialog.close()
    }
  }, [loading])

  
  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, result) {
      const userData = result.data.login
      dispatch({type: 'LOGIN', payload: userData})
      f7.views.current.router.back()
      f7.panel.close('right') 
    }, 
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: {mobile, password}
  })
  
  const handleLogin = () => {
    login()
  }
  return (
    <Page>
      <Navbar title={labels.login} backLink={labels.back} />
      <List form>
        <ListInput
          label={labels.mobile}
          type="number"
          placeholder={labels.mobilePlaceholder}
          name="mobile"
          clearButton
          errorMessage={mobileErrorMessage}
          errorMessageForce
          onChange={e => setMobile(e.target.value)}
          onInputClear={() => setMobile('')}
        />
        <ListInput
          label={labels.password}
          type="number"
          placeholder={labels.passwordPlaceholder}
          name="password"
          clearButton
          errorMessage={passwordErrorMessage}
          errorMessageForce
          onChange={e => setPassword(e.target.value)}
          onInputClear={() => setPassword('')}
        />
      </List>
      {!mobile || !password || mobileErrorMessage || passwordErrorMessage ? '' : 
        <Button text={labels.login} large onClick={() => handleLogin()} />
      }
      <Toolbar bottom>
        <Link href="/register/n">{labels.newUser}</Link>
        <Link href="/password-request/">{labels.forgetPassword}</Link>
      </Toolbar>
    </Page>
  )
}

export default Login