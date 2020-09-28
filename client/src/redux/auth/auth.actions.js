import axios from 'axios';
import {setAlert} from '../alert/alert.actions';
import setAuthToken from '../../utils/setAuthToken';
import {REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT} from '../types';

// To load User
export const loadUser = () => async (dispatch) => 
{
  
  if(localStorage.token)
  {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/users");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

//To Register a User
export const register = ({name, email, password}) => async (dispatch) =>
{
  const config = 
  {
    headers: 
    {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({name, email, password});

  try 
  {
    const res = await axios.post("/api/auth/register", body, config);  
    
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser());

  } catch (err) 
  {
    const e = err.response.data.errors;

    if(e)
    {
      e.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
};

//To Login user
export const login = (email, password) => async (dispatch) =>
{
  const config = 
  {
    headers: 
    {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({email, password});

  try 
  {
    const res = await axios.post("/api/auth/login", body, config);  
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser());

  } catch (err) 
  {
    const e = err.response.data.errors;

    if(e)
    {
      e.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    })
  }
};

// Logout / Clear profile
export const logout = () => (dispatch) => 
{
  dispatch({type: LOGOUT});
  window.location.reload();
};