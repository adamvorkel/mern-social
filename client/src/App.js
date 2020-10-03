import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import LandingView from './components/views/LandingView';
import LoginView from './components/views/LoginView';
import RegisterView from './components/views/RegisterView';
import './App.css';
import setAuthToken from './helpers/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage['auth-token']) {
  setAuthToken(localStorage['auth-token']);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path='/' component={LandingView} />
            <Route>
              <Navbar />
              <Alert />
              <Switch>
                <Route exact path='/login' component={LoginView} />
                <Route exact path='/register' component={RegisterView} />
              </Switch>
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
