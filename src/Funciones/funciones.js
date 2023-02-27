const loggedUserJSON = window.localStorage.getItem('loggedUser')

const isLogged = () => {
  if(loggedUserJSON){
    return true;
  } else return false;
}

const logOut = () =>{
  console.log("Me llaman")
  window.localStorage.removeItem('loggedUser');
  window.location.reload()
}

export{
  isLogged, logOut
};