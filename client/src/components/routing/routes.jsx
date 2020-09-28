import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Register from '../auth/register';
import Dashboard from '../dashboard/dashboard';
import CreateProfile from '../profile-form/create_profile';
import EditProfile from '../profile-form/edit_profile';
import AddExperience from '../profile-form/add_experience';
import AddEducation from '../profile-form/add_education';
import Profile from '../profile/profile';
import Profiles from '../profiles/profiles';
import Posts from '../posts/posts';
import Post from '../post/post';
import NotFound from '../layout/not-found';
import PrivateRoute from '../routing/PrivateRoute';
import Login from '../auth/login';
import Alert from '../layout/alert';

const Routes = () => {
    return (
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
            <Route component = {NotFound} />
          </Switch>
        </section>
    )
};

export default Routes;