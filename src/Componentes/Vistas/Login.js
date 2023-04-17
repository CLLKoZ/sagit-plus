import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { NavLink,  useNavigate } from "react-router-dom";
import useAuth from "../Proveedores/useAuth";
import '../../Estilos/login.css';
import { login, getCurrentUser } from "../../Funciones/funciones";

const Login = () =>{
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  /* Cargar los estados de los inputs que estaran en el longin y uno para un 
  posible error */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  /* Para que el enfoque caiga en el input de usuario */
  useEffect(() =>{
    userRef.current.focus();
  }, []);

  /* Limpía el mensaje de error una ves que el usurio se ubique en uno de los 
  inputs */
  useEffect(() =>{
    setErrMsg('');
  }, [username, password]);

  /* Envia los datos requeridos por la funcion de login, si la respuesta no es un 
  error asigna los datos del usuario al setAuth para que lo autorice, setea en 
  blanco el estado usuario y la contraseña, en cambio si la respuesta es un error, 
  ademas que redirige a la direccion solicitada anteriormente. */
  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    login(username, password).then(
      () => {
        setAuth(getCurrentUser());
        setUsername('');
        setPassword('');
        navigate('/mapa');
      }
    ).catch((error)=>{
      if(!error?.response){
        setErrMsg('El servidor no responde');
      } else if(error?.response?.status === 400){
        setErrMsg('El usuario o la contraseña son incorrectos');
      } else if (error?.response?.status === 401){
        setErrMsg('Usuario no autorizado');
      } else {
        setErrMsg('Falló el inicio de sesión');
      }
      errRef.current.focus();
    })
  }
  
  return(
    /*Componente HTML para la vista de login*/
    <div className='principal'>
      <div className='wrapper'>
        <div className='form-box login'>
          <h1 className="titulo">SAGIT</h1>
          <h3>Inicio de Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <span className='icon'><FontAwesomeIcon icon={faUser}/> </span>
              <input 
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              />
              <label>&nbsp;Usuario</label>
            </div>
            <div className='input-box'>
              <span className='icon'><FontAwesomeIcon icon={faLock}/> </span>
              <input type='password' 
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              />
              <label>&nbsp;Contraseña</label>
            </div>
            <div className='forgot'>
              <NavLink to='/forgot'>¿Olvidó su contraseña?</NavLink>
            </div>
            <button className='boton'>Iniciar Sesión</button>
            {/* Mensaje de error desplegable */}
            <p ref={errRef} className={errMsg ? 'errmsg' : 'desaparece'} aria-live='assertive'>{errMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;