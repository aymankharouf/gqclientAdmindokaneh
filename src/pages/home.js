import React from 'react'
import MainCategories from './main-categories'
import { GET_NOTIFICATIONS } from '../graphql'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../auth-provider'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import labels from '../data/labels'

const Home = () => {
  const { state } = React.useContext(AuthContext)
  const { loading, data } = useQuery(GET_NOTIFICATIONS, {variables: {toUser: state.user}})
  const [notifications, setNotifications] = React.useState([])
  React.useEffect(() => {
    setNotifications(() => data?.notifications.filter(n => n.status === 'n') || [])
  }, [data])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MainCategories/>
      </IonContent>
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
    </IonPage>
  )
}

export default Home
