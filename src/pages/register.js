import { useContext, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from '../graphql'
import { useHistory } from "react-router-dom"
import { IonContent, IonFooter, IonLoading, IonButton, IonToast, IonList, IonHeader, IonToolbar, IonTitle, IonPage, IonItem, IonLabel, IonInput, IonText, IonButtons, IonMenuButton } from '@ionic/react';
import labels from '../data/labels'

import { AuthContext } from '../auth-provider'



const Register = props => {
  const { dispatch } = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  let history = useHistory();
  useEffect(() => {
    const patterns = {
      name: /^.{4,50}$/,
    }
    const validateName = value => {
      if (patterns.name.test(value)){
        setNameError('')
      } else {
        setNameError(labels.invalidName)
      }
    }  
    if (name) validateName(name)
  }, [name])  
  useEffect(() => {
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
  useEffect(() => {
    const validateConfirmPassword = (value1, value2) => {
      if (value1 === value2){
        setConfirmPasswordError('')
      } else {
        setConfirmPasswordError(labels.passwordMismatch)
      }
    }
    if (password && confirmPassword) validateConfirmPassword(password, confirmPassword)
  }, [password, confirmPassword])
  useEffect(() => {
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
  const [register, { loading }] = useMutation(REGISTER, {
    update(cache, result) {
      const userData = result.data.register
      dispatch({type: 'LOGIN', payload: userData})
      history.push('/home', {direction: 'none'});
    }, 
    onError(err) {
      setError(err.graphQLErrors[0])
    },
    variables: {name, mobile, password, confirmPassword}
  })
  
  const handleRegister = event => {
    event.preventDefault()
    register()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{labels.register}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleRegister} style={{padding: 10}}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" color="primary">{labels.name}</IonLabel>
              <IonInput name="name" type="text" required value={name} spellCheck={false} autocapitalize="off" onIonChange={e => setName(e.detail.value)}>
              </IonInput>
            </IonItem>
            {nameError && <IonText color="danger">
              <p className="ion-padding-start" style={{fontSize: 12}}>
                {nameError}
              </p>
            </IonText>}
            <IonItem>
              <IonLabel position="floating" color="primary">{labels.mobile}</IonLabel>
              <IonInput name="mobile" type="text" required value={mobile} spellCheck={false} autocapitalize="off" onIonChange={e => setMobile(e.detail.value)}>
              </IonInput>
            </IonItem>
            {mobileError && <IonText color="danger">
              <p className="ion-padding-start" style={{fontSize: 12}}>
                {mobileError}
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="floating" color="primary">{labels.password}</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value)}>
              </IonInput>
            </IonItem>
            {passwordError && <IonText color="danger">
              <p className="ion-padding-start" style={{fontSize: 12}}>
                {passwordError}
              </p>
            </IonText>}
            <IonItem>
              <IonLabel position="floating" color="primary">{labels.confirmPassword}</IonLabel>
              <IonInput name="confirmPassword" type="password" value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value)}>
              </IonInput>
            </IonItem>
            {confirmPasswordError && <IonText color="danger">
              <p className="ion-padding-start" style={{fontSize: 12}}>
                {confirmPasswordError}
              </p>
            </IonText>}
          </IonList>
          {name && mobile && password && confirmPassword && !nameError && !mobileError && !passwordError && !confirmPasswordError && 
            <IonButton type="submit" expand="block" fill="clear">{labels.register}</IonButton>
          }
        </form>
      </IonContent>
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

export default Register