import axios from '../API/Axios'

const loggedUserJSON = localStorage.getItem('loggedUser')

const isLogged = () => {
  if(loggedUserJSON){
    return true;
  } else return false;
}

const login = (username, password) => {
  return axios
    .post("/user/login", {
      data: {
        'username': username,
        'password': password
      },
      headers: { 'Content-Type': 'application/json'},
      withCredentials: true
    })
    .then((response) => {
      const session = {
        username: response.data.data.user[0].username,
        token: `Bearer ${response.data.token}`,
        nombre: response.data.data.user[0].firstName,
        forms: response.data.data.forms
      }
      if (response.data.token) {
        localStorage.setItem("loggedUser", JSON.stringify({session}));
      }
      return response.data;
    })
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("loggedUser"));
};

const logOut = () =>{
  window.localStorage.removeItem('loggedUser');
  window.location.reload()
}

export{
  isLogged, logOut,
  login, getCurrentUser
};