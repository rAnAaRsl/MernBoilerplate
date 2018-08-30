import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData).then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

/// Login Get User Token


export const loginUser = userData =>dispatch=>{
  axios.post('/api/users/login',userData).then(
      res=>{
          // Save to Local Storage

          const {token} = res.data;

          // Set Token

          localStorage.setItem('jwtToken',token);

          // Set token to Auth header

          setAuthToken(token);

          // Decode Token to get User Data

          const decode = jwtDecode(token);

          // Set Current User

          dispatch(setCurrentUser(decode));
      }
  ).catch(err =>
      dispatch({
          type: GET_ERRORS,
          payload: err.response.data
      })
  );
};

export const setCurrentUser =(decode)=>{
    return{
        type:SET_CURRENT_USER,
        payload:decode
    }
};

// Log user out

export const logoutUser =()=> dispatch=>{
    // Remove token from local Storage

    localStorage.removeItem('jwtToken');

    // Remove auth header for future requests

    setAuthToken(false);

    // Set Current User to {} which will set isAuthenticated to false

    dispatch(setCurrentUser({}));
}