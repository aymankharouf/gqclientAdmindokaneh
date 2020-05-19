import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { Container } from 'semantic-ui-react'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Menubar from './components/menubar'
import Store from './store'

const App = () => {
  return (
    <Store>
      <BrowserRouter>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </BrowserRouter>
    </Store>
  );
}

export default App;
