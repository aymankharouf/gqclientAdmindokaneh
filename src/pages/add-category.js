import { useState, } from 'react'
import { IonContent, IonFooter, IonLoading, IonButton, IonToast, IonList, IonHeader, IonToolbar, IonTitle, IonPage, IonItem, IonLabel, IonInput, IonText, IonButtons, IonMenuButton } from '@ionic/react';
import labels from '../data/labels'
import { useHistory } from "react-router-dom"
import { CREATE_CATEGORY } from '../graphql'
import { useMutation } from '@apollo/react-hooks'


const AddCategory = props => {
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [ordering, setOrdering] = useState('')
  let history = useHistory()
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    update(cache, result) {
      const userData = result.data.createCategory
      history.push('/home', {direction: 'none'});
    }, 
    onError(err) {
      setError(err.graphQLErrors[0])
    },
    variables: {parentId: props.id, name, ordering}
  })
  const handleSubmit = event => {
    event.preventDefault()
    createCategory()
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{labels.addCategory}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleSubmit} style={{padding: 10}}>
          <IonList>
            <IonItem>
              <IonLabel position="floating" color="primary">{labels.name}</IonLabel>
              <IonInput name="name" type="text" required value={name} spellCheck={false} autocapitalize="off" onIonChange={e => setName(e.detail.value)}>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating" color="primary">{labels.ordering}</IonLabel>
              <IonInput name="ordering" type="text" required value={ordering} spellCheck={false} autocapitalize="off" onIonChange={e => setOrdering(e.detail.value)}>
              </IonInput>
            </IonItem>
          </IonList>
          {name && ordering && 
            <IonButton type="submit" expand="block" fill="clear">{labels.add}</IonButton>
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
export default AddCategory
