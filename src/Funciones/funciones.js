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

    const user = response.data.data.user[0].username
    const accessToken = `Bearer ${response.data.token}`
    const nombre = response.data.data.user[0].firstName
    const forms = response.data.data.forms

  if (response.data.token) {
    localStorage.setItem("loggedUser", JSON.stringify({ user, accessToken, nombre, forms }));
  }
  return response.data;
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("loggedUser"));
};

const logOut = () =>{
  window.localStorage.removeItem('loggedUser');
  window.location.assign('/login');
}

export{
  isLogged, logOut,
  login, getCurrentUser
};