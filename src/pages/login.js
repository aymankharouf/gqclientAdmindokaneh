import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { AuthContext } from '../auth-provider'
import labels from '../data/labels'
import { IonFooter, IonLoading, IonButton, IonToast, IonList, IonHeader, IonToolbar, IonTitle, IonPage, IonItem, IonLabel, IonInput, IonText, IonButtons, IonMenuButton } from '@ionic/react';
import { useHistory } from "react-router-dom"

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
  const [error, setError] = React.useState('')
  const [mobileError, setMobileError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  let history = useHistory();
  React.useEffect(() => {
    const patterns = {
      password: /^.{4}$/,
    }
    const validatePassword = (value) => {
      if (patterns.password.test(value)){
        setPasswordError('')
      } else {
        setPasswordError(labels.invalidPassword)
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
        setMobileError('')
      } else {
        setMobileError(labels.invalidMobile)
      }
    }
    if (mobile) validateMobile(mobile)
  }, [mobile])
  
  const [login, { loading }] = useMutation(LOGIN, {
    update(cache, result) {
      const userData = result.data.login
      dispatch({type: 'LOGIN', payload: userData})
      history.push('/tabs/schedule', {direction: 'none'});
    }, 
    onError(err) {
      setError(err.graphQLErrors[0].extensions.errors)
    },
    variables: {mobile, password}
  })
  
  const handleLogin = async e => {
    e.preventDefault();
    login()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{labels.login}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form noValidate onSubmit={handleLogin}>
        <IonList>
          <IonItem>
            <IonLabel position="stacked" color="primary">{labels.mobile}</IonLabel>
            <IonInput name="mobile" type="text" required value={mobile} spellCheck={false} autocapitalize="off" onIonChange={e => setMobile(e.detail.value)}>
            </IonInput>
          </IonItem>
          {mobileError && <IonText color="danger">
            <p className="ion-padding-start" style={{fontSize: 12}}>
              {mobileError}
            </p>
          </IonText>}

          <IonItem>
            <IonLabel position="stacked" color="primary">{labels.password}</IonLabel>
            <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value)}>
            </IonInput>
          </IonItem>
          {passwordError && <IonText color="danger">
            <p className="ion-padding-start" style={{fontSize: 12}}>
              {passwordError}
            </p>
          </IonText>}
        </IonList>
        {mobile && password && !mobileError && !passwordError && <IonButton type="submit" expand="block" fill="clear">Login</IonButton>}
      </form>
      <IonFooter>
        <IonToolbar>
          <IonTitle>Footer</IonTitle>
        </IonToolbar>
      </IonFooter>
      <IonToast
        isOpen={!!error}
        onDidDismiss={() => setError('')}
        message={error}
        duration={200}
      />
      <IonLoading isOpen={loading} />
    </IonPage>
  )
}

export default Login