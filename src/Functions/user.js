import axios from '../API/Axios'

const loggedUserJSON = localStorage.getItem('loggedUser')

const isLogged = () => {
  if(loggedUserJSON){
    return true;
  } else return false;
}

const login = async (username, password) => {
  const response = await axios
    .post("/user/login", {
      data: {
        'username': username,
        'password': password
      },
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  const session = {
    username: response.data.data.user[0].username,
    token: `Bearer ${response.data.token}`,
    nombre: response.data.data.user[0].firstName,
    forms: response.data.data.forms
  };
  if (response.data.token) {
    localStorage.setItem("loggedUser", JSON.stringify({ session }));
  }
  return response.data;
};

const forgotPassword = async (username) => {
  const response = await axios
    .post("/user/forgot-password", {
      data: {
        'username': username,
      },
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
  return response.data;
};

const newPassword = async (password, token=null) => {
  const response = await axios
    .post("/user/forgot-password/" + token, {
      data: {
        'newpassword': password,
      },
      headers: { 'Content-Type': 'application/json' }
    });
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("loggedUser"));
};

const logOut = (navigate) =>{
  window.localStorage.removeItem('loggedUser');
  navigate('/login')
}

export{
  isLogged, logOut, login, 
  getCurrentUser, forgotPassword,
  newPassword
};