import { useContext, useState, useEffect } from 'react'
import { f7, Page, Navbar, List, ListItem } from 'framework7-react'
import labels from '../data/labels'
import { AuthContext } from '../auth-provider'
import { GET_NOTIFICATIONS } from '../graphql'
import { useQuery } from '@apollo/react-hooks'

const Panel = () => {
  const { state, dispatch } = useContext(AuthContext)
  const { loading, data } = useQuery(GET_NOTIFICATIONS, {variables: {toUser: state.user}})
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    setNotifications(() => data?.notifications.filter(n => n.status === 'n') || [])
  }, [data])
  useEffect(() => {
    if (loading) {
      f7.dialog.preloader('')
    } else {
      f7.dialog.close()
    }
  }, [loading])
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
    f7.views.main.router.navigate('/home/', {reloadAll: true})
    f7.panel.close('right') 
    //dispatch({type: 'CLEAR_BASKET'})
  }
  return(
    <Page>
      <Navbar title={labels.mainPanelTitle} />
      <List>
        {state.user ? <ListItem link="#" title={labels.logout} onClick={() => handleLogout()} />
        : <ListItem link="/panel-login/" title={labels.login} />}
        {state.user && <ListItem link="/change-password/" title={labels.changePassword} />}
        {state.user && <ListItem link="/notifications/" title={labels.notifications} badge={notifications.length} badgeColor="red" view="#main-view" panelClose />}
        {state.user && <ListItem link="/packs/0/type/f" title={labels.favorites} view="#main-view" panelClose />}
        {state.user && <ListItem link="/orders-list/" title={labels.myOrders} view="#main-view" panelClose />}
        {state.user && <ListItem link="/purchased-packs/" title={labels.purchasedPacks} view="#main-view" panelClose />}
        {state.user && <ListItem link="/friends/" title={labels.friends} view="#main-view" panelClose />}
        {state.user && <ListItem link="/store-summary/" title={labels.myPacks} view="#main-view" panelClose />}
        {!state.user && <ListItem link="/register/o" title={labels.registerStoreOwner} />}
      </List>
    </Page>
  )
}
export default Panel
