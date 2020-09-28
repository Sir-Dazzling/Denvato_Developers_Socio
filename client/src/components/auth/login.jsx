import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {login} from '../../redux/auth/auth.actions';

const Login = ({login, isAuthenticated}) => 
{

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {email, password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = (e) => 
    {
        e.preventDefault();

        login(email, password);
    };

    // Redirect if logged in
    if(isAuthenticated)
    {
        return <Redirect to = "/dashboard" />
    }

    return (
        <div>
           <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" required value = {email} onChange = {e => onChange(e)}/>
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
                </div>
                <div className="form-group">
                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = {password}
                    onChange = {e => onChange(e)}
                    minLength="6"
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Sign In" />
            </form>
            <p className="my-1">
                Dont have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

Login.propTypes = 
{
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, {login})(Login);