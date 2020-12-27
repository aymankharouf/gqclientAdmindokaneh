import { useState, useEffect } from 'react'
import labels from '../data/labels'
import { randomColors } from '../data/config'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../graphql'
import { IonContent, IonLoading, IonButton, IonHeader, IonToolbar, IonTitle, IonPage, IonButtons, IonMenuButton } from '@ionic/react';

const Categories = (props) => {
  const { loading, data } = useQuery(GET_CATEGORIES)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    setCategories(() => {
      const categories = data?.categories.filter(c => c.parentId === props.id)
      return categories?.sort((c1, c2) => c1.ordering - c2.ordering)  
    })
  }, [data, props.id])

  let i = 0
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{labels.login}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" color={randomColors[i++ % 10]} href={`/search/`}>{labels.allProducts}</IonButton>
        {categories?.map(c => 
          <IonButton key={c.id} expand="block" color={randomColors[i++ % 10]} href={c.isLeaf ? `/packs/${c.id}/type/n` : `/categories/${c.id}`}>{c.name}</IonButton>
        )}
      </IonContent>
      <IonLoading isOpen={loading} />
    </IonPage>
  )
}


export default Categories
