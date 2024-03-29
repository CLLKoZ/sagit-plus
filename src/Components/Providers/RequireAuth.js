import { useLocation, Navigate, Outlet } from "react-router-dom";

/* Se encarga de enviar al usuario al login sino está logeado o de
redireccionarlo a la pagina en la que estaba si intenta entrar al
login de nuevo */
const RequireAuth = () => {
    const location = useLocation();

    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    return(
        loggedUserJSON || location.pathname === '/' ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;