import React, {useEffect} from 'react';
import { Switch ,Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Routes from './components/routing/routes';

import setAuthToken from './utils/setAuthToken';
import {loadUser} from './redux/auth/auth.actions';
import {store} from './redux/store';

import './App.css';

if(localStorage.token)
  {
    setAuthToken(localStorage.token);
  }

function App() 
{

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path = "/" component = {Landing} />
        <Route component = {Routes} />
      </Switch>
        
    </div>
  );
}

function mapStateToProps(state) 
{
    const { auth } = state;
    const { user } = auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);