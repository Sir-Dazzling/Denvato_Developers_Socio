import axios from 'axios';

const setAuthToken = (token) => 
{
   if(token)
   {
        axios.defaults.headers.common['x-auth-token'] = token;
        // console.log("saved axios token is: "+axios.defaults.headers.common['x-auth-token'])
   }else
   {
       delete axios.defaults.headers.common['x-auth-token'];
   }
}
export default setAuthToken;