import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from '../API/Axios';
import useAuth from "../Componentes/Proveedores/useAuth";
import Header from "../Componentes/Estructura/Header";
import '../Estilos/login.css';

const LOGIN_URL = '/v1/user/login';

const Login = () =>{
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  /* Cargar los estados de los inputs que estaran
  en el longin y uno para un posible error */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  /* Para que el enfoque caiga en el input de usuario */
  useEffect(() =>{
    userRef.current.focus();
  }, []);

  /* Limpía el mensaje de error una ves que el usurio
  se ubique en uno de los inputs */
  useEffect(() =>{
    setErrMsg('');
  }, [username, password]);

  /* Setea en blanco el usuario y la contraseña ademas
  que cambia el estado success a true */
  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    try {
      const respuesta = await axios.post(LOGIN_URL,
        JSON.stringify({username, password}), 
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(JSON.stringify(respuesta?.data));
      const accessToken = respuesta?.data?.accessToken;
      setAuth({ username, password, accessToken })
      setUsername('');
      setPassword('');
      setSuccess(true);
    } catch(err){
      if(!err?.respuesta){
        setErrMsg('El servidor no responde');
      } else if(err?.respuesta.status === 400){
        setErrMsg('El usuario o la contraseña son incorrectos');
      } else if (err?.respuesta.status === 401){
        setErrMsg('Usuario no autorizado');
      } else {
        setErrMsg('Falló el inicio de sesión');
      }
      errRef.current.focus();
    }
  }

  return(
    <> {success ? (
      <div className='principal'>
        <Header></Header>
        <div className='wrapper'>
          <h2>Esta logueado!!!</h2>
        </div>
      </div>
    ) : (
    <div className='principal'>
      <Header></Header>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'desaparece'} aria-live='assertive'>{errMsg}</p>
      <div className='wrapper'>
        <div className='form-box login'>
          <h2>Inicio de Sesión</h2>
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
              <a href='#'>¿Olvidó su contraseña?</a>
            </div>
            <button className='boton'>Iniciar Sesión</button>
          </form>
        </div>
      </div>
    </div>
    )};</>
  );
};

export default Login;