import axios from 'axios';
import { useState, useEffect } from 'react';

const Login = async (username, password) => {
  const [usuario, useUsuario] = useState(null);

  const {data} = await axios.post('http://168.232.50.15/v1/project/find', {
    username,
    password
  });
  useUsuario(data.username);
}

export{
  Login
};