import React from 'react'
import { f7, Button } from 'framework7-react'
import { randomColors } from '../data/config'
import labels from '../data/labels'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../graphql'

const MainCategories = () => {
  const { loading, data } = useQuery(GET_CATEGORIES)
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    setCategories(() => {
      const categories = data?.categories.filter(c => !c.parentId)
      return categories?.sort((c1, c2) => c1.ordering - c2.ordering)  
    })
  }, [data])
  React.useEffect(() => {
    if (loading) {
      f7.dialog.preloader('')
    } else {
      f7.dialog.close()
    }
  }, [loading])
  let i = 0
  return (
    <React.Fragment>
      <Button
        text={labels.allProducts}
        href={`/search/`} 
        large 
        fill 
        className="sections" 
        color={randomColors[i++ % 10].name} 
      />
      {categories?.map(c => {
        return (
          <Button
            text={c.name}
            href={`/categories/${c.id}`} 
            large 
            fill 
            className="sections" 
            color={randomColors[i++ % 10].name} 
            key={c.id}
          />
        )
      })}
    </React.Fragment>
  )

}
export default MainCategories
