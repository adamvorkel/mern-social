import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import LandingView from './components/views/LandingView';
import LoginView from './components/views/LoginView';
import RegisterView from './components/views/RegisterView';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/' component={LandingView} />
        <Switch>
          <Route exact path='/login' component={LoginView} />
          <Route exact path='/register' component={RegisterView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
