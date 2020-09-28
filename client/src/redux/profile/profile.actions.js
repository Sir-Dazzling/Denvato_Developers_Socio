import axios from 'axios';
import {setAlert} from '../alert/alert.actions';

import {GET_PROFILE, GET_PROFILES, GET_REPOS, UPDATE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, ACCOUNT_DELETED} from '../types';

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => 
{
    try 
    {
        const res = await axios.get("/api/profile/me");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });   
    }
};

// Create or Update a profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => 
{
    const config = 
    {
        headers: 
        {
            "Content-type": "application/json"
        }
    };

    try 
    {
        const res = await axios.post("/api/profile", formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

        if(!edit)
        {
           history.push("/dashboard");
        }

    } catch (error) 
    {
        const e = error.response.data.errors;

        if(e)
        {
            e.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Getting all user profiles
export const getProfiles = () => async (dispatch) => 
{
    dispatch({type: CLEAR_PROFILE});
    try 
    {
        const res = await axios.get("/api/profile");

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });   
    }
};

// Getting User profiles by ID
export const getProfileById = (userId) => async (dispatch) => 
{
    try 
    {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });   
    }
};

// Getting github repos
export const getGithubRepos = (githubUsername) => async (dispatch) => 
{
    try 
    {
        const res = await axios.get(`/api/profile/github/${githubUsername}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });   
    }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => 
{
    const config = 
    {
        headers: 
        {
            "Content-type": "application/json"
        }
    };

    try 
    {
        const res = await axios.put("/api/profile/experience", formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience Added", "success"));
        history.push("/dashboard");  
    } catch (error) 
    {
        const e = error.response.data.errors;

        if(e)
        {
            e.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => 
{
    const config = 
    {
        headers: 
        {
            "Content-type": "application/json"
        }
    };
    
    try 
    {
        const res = await axios.put("/api/profile/education", formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education Added", "success"));
        history.push("/dashboard");  
    } catch (error) 
    {
        const e = error.response.data.errors;

        if(e)
        {
            e.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => 
{
    try 
    {
        const res = await axios.delete(`/api/profile/experience/${id}`);   

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Experience Deleted", "success"));
    } catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => 
{
    try 
    {
        const res = await axios.delete(`/api/profile/education/${id}`);   

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert("Education Deleted", "success"));
    } catch (error) 
    {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => 
{
    if(window.confirm("Are you sure? This cannot be reverted!!!"))
    {
        try 
        {
            await axios.delete(`/api/profile`);   

            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert("Your account has been permanently deleted"));
        } catch (error) 
        {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusText, status: error.response.status}
            });
        }
    }
};