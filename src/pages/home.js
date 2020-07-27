import React from 'react'
import { f7, Page, Navbar, NavLeft, NavTitle, Link, Toolbar, NavTitleLarge, Block } from 'framework7-react'
import labels from '../data/labels'
import MainCategories from './main-categories'
import { GET_NOTIFICATIONS } from '../graphql'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../auth-provider'

const Home = () => {
  const { state } = React.useContext(AuthContext)
  const { loading, data } = useQuery(GET_NOTIFICATIONS, {variables: {toUser: state.user}})
  const [notifications, setNotifications] = React.useState([])
  React.useEffect(() => {
    setNotifications(() => data?.notifications.filter(n => n.status === 'n') || [])
  }, [data])
  React.useEffect(() => {
    if (loading) {
      f7.dialog.preloader('')
    } else {
      f7.dialog.close()
    }
  }, [loading])

  return (
    <Page>
      <Navbar large>
        <NavLeft>
          <Link iconMaterial="menu" panelOpen="right" iconBadge={notifications.length} badgeColor="red" />
        </NavLeft>
        <NavTitle sliding>
          <img src="/dokaneh_logo.png" alt="logo" className="logo" />
          <span className='banner'>{labels.banner}</span>
        </NavTitle>
        <NavTitleLarge>
          <img src="/dokaneh_logo.png" alt="logo" className="logo" />
          <span className='banner'>{labels.banner}</span>
        </NavTitleLarge>
      </Navbar>
      <Block>
        <MainCategories/>
      </Block>
    </Page>
  )
}

export default Home
