import React from 'react'
import { randomColors } from '../data/config'
import labels from '../data/labels'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../graphql'
import { IonLoading, IonButton } from '@ionic/react';

const MainCategories = () => {
  const { loading, data } = useQuery(GET_CATEGORIES)
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    setCategories(() => {
      const categories = data?.categories.filter(c => !c.parentId)
      return categories?.sort((c1, c2) => c1.ordering - c2.ordering)  
    })
  }, [data])
  let i = 0
  return (
    <React.Fragment>
      <IonLoading isOpen={loading} />
      <IonButton expand="block" color={randomColors[i++ % 10]} href={`/search/`}>{labels.allProducts}</IonButton>
      {categories?.map(c => 
        <IonButton key={c.id} expand="block" color={randomColors[i++ % 10]} href={`/categories/${c.id}`}>{c.name}</IonButton>
      )}
    </React.Fragment>
  )

}
export default MainCategories
