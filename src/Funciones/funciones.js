import axios from '../API/Axios';
import { useState, useEffect } from 'react';

const LOGIN_URL = '/v1/user/login';

const LoginService = async (username, password) => {
  const {data} = await axios.post(LOGIN_URL, {data: {
    'username': username,
    'password': password
  }, 
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true});
  return data;
}

export{
  LoginService
};