import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { StoreContext } from '../store'

const Menubar = () => {
  const { state, dispatch } = React.useContext(StoreContext)
  const [activeItem, setActiveItem] = React.useState('home')
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu pointing secondary color="teal">
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      {state.user ? 
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={() => dispatch({type: 'LOGOUT'})}
          />
        </Menu.Menu>
      : <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      }
    </Menu>
  )
}

export default Menubar