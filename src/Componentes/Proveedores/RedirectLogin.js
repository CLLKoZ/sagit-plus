import { useLocation, Navigate, Outlet } from "react-router-dom";

const RedirectLogin = () =>{
  const location = useLocation();

  const loggedUserJSON = window.localStorage.getItem('loggedUser')

  return(
    loggedUserJSON ? <Navigate to="/mapa" state={{ from: location }} replace/> : <Outlet/>
  );
}

export default RedirectLogin;