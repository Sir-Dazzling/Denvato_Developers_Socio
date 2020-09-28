import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Register from './components/auth/register';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/profile-form/create_profile';
import EditProfile from './components/profile-form/edit_profile';
import AddExperience from './components/profile-form/add_experience';
import AddEducation from './components/profile-form/add_education';
import Profile from './components/profile/profile';
import Profiles from './components/profiles/profiles';
import Posts from './components/posts/posts';
import Post from './components/post/post';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/login';
import Alert from './components/layout/alert';

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
        <Route exact path = "/" component = {Landing} />
        <section className = "container">
          <Alert />
          <Switch>
            <Route exact path = "/register" component = {Register}  />
            <Route exact path = "/login" component = {Login} />
            <Route exact path = "/profiles" component = {Profiles} />
            <Route exact path = "/profile/:id" component = {Profile} />
            <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
            <PrivateRoute exact path = "/create_profile" component = {CreateProfile} />
            <PrivateRoute exact path = "/edit_profile" component = {EditProfile} />
            <PrivateRoute exact path = "/add_experience" component = {AddExperience} />
            <PrivateRoute exact path = "/add_education" component = {AddEducation} />
            <PrivateRoute exact path = "/posts" component = {Posts} />
            <PrivateRoute exact path = "/posts/:id" component = {Post} />
          </Switch>
        </section>
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