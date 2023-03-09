import { useLocation, Navigate, Outlet } from "react-router-dom";

/* Se encarga de no dejar entrar al usuario al login de nuevo una
vez este ya inició sesión y lo redirecciona a la pagina de /mapa */
const RedirectLogin = () =>{
  const location = useLocation();

  const loggedUserJSON = window.localStorage.getItem('loggedUser')

  return(
    loggedUserJSON ? <Navigate to="/mapa" state={{ from: location }} replace/> : <Outlet/>
  );
}

export default RedirectLogin;