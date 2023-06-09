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
  const session = Object.freeze({
    username: response.data.data.user[0].username,
    token: `Bearer ${response.data.token}`,
    nombre: response.data.data.user[0].firstName,
    forms: response.data.data.forms,
    projects: response.data.data.projects,
    id: response.data.data._id
  });
  console.log(session)
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

const logOutNoHook = () =>{
  window.localStorage.removeItem('loggedUser');
  window.location.replace('/login')
  window.location.reload()
}

/* Se utiliza para obtener el listado de proyectos y formularios del usuario */
const getProjects = () => {
  const projectInfo = [];
  getCurrentUser().session.projects.forEach(project => {
    const projectObj = { _id: project._id, name: project.name, forms: [], typeObjectEvaluation: project.typeObjectEvaluation };
    getCurrentUser().session.forms.forEach(form => {
      if (form.projects.includes(project._id)) {
        const formObj = { _id: form._id, name: form.name };
        projectObj.forms.push(formObj);
      }
    });
    if (projectObj.forms.length > 0) {
      projectInfo.push(projectObj);
    }
  });
  return projectInfo;
}

/* Obtiene el listado de formularios del usuario según proyecto */
const getForms = (idProject) => {
  const projectInfo = getProjects().find(project => project._id === idProject);
  if (!projectInfo) { 
    return []; 
  } else {
    const forms = projectInfo.forms.filter(form => !form.isActive).map(form => ({ _id: form._id, name: form.name }));
    return forms;
  }
}

export{
  isLogged, logOut, login, 
  getCurrentUser, forgotPassword,
  newPassword, logOutNoHook, getProjects, getForms
};