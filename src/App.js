import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { Container } from 'semantic-ui-react'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Menubar from './components/menubar'
import AuthProvider from './auth-provider'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
