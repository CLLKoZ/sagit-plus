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
        nombre: response.data.data.user[0].firstName
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
  console.log("Me llaman")
  window.localStorage.removeItem('loggedUser');
  window.location.reload()
}

const allInspections = async () => {
  console.log(getCurrentUser().session.token)
  const headers = {
    Authorization: getCurrentUser().session.token
  };
  const body = {
    "filter": {isActive: true},
    "regex": [],
    "populate": ["typeObjectEvaluation"],
    "attributes": [],
    "pageNumber": 1,
    "limit": 5
  }
  const peticion = await axios.post('/object-evaluation/find', body, {headers})
  console.log('Soy')
  console.log(peticion.data.data)
}

export{
  isLogged, logOut, allInspections,
  login, getCurrentUser
};