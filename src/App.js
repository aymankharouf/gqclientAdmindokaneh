import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { Container } from 'semantic-ui-react'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Menubar from './components/menubar'
import Store from './store'

function App() {
  return (
    <Store>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </Store>
  );
}

export default App;
