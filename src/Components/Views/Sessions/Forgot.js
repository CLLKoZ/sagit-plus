import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../Styles/login.css';
import Icon from '@mdi/react';
import { mdiAccountHardHat, mdiArrowULeftBottomBold} from '@mdi/js';
import { forgotPassword } from '../../../Functions/user';

const Forgot = () => {

  const userRef = useRef();
  const errRef = useRef();
  const sccssRef = useRef();

  const [username, setUsername] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

   /* Para que el enfoque caiga en el input de usuario */
  useEffect(() =>{
    userRef.current.focus();
    document.title = "SAGIT | Recuperar contraseña"
  }, []);

  /* Limpía el mensaje de error una ves que el usurio se ubique en uno de los 
  inputs */
  useEffect(() =>{
    setErrMsg('');
  }, [username]);

  const tempSuccess = () => setTimeout(() => {
    setSuccessMsg('');
  }, 3000)

  const handleSubmit = async(e) =>{
    e.preventDefault();

    forgotPassword(username).then(
      () => {
        setSuccessMsg('Revise su correo electronico');
        setUsername('');
        tempSuccess();
      }
    ).catch((error) => {
      if (error.response.status === 500){
        setErrMsg('Usuario no encontrado');
      } else {
        setErrMsg('Fallo interno en el servidor');
      }
    })
  }

  return (
    <div className='principal'>
      <div className='wrapper'>
        <div className='form-box login'>
          <h1 className="titulo">SAGIT</h1>
          <h3 className='pollito'>¿Olvidó su contraseña?</h3>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <span className='icon'><Icon path={mdiAccountHardHat} size={1.2} /> </span>
              <input 
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              />
              <label>&nbsp;Ingresar usuario</label>
            </div>
            <div className='forgot'>  
              <NavLink to='/login'>&nbsp;Regresar <Icon path={mdiArrowULeftBottomBold} size={1.1} /></NavLink>
            </div>
            <button className='boton'>Solicitar contraseña nueva</button>
            {/* Mensaje de error desplegable */}
            <p ref={sccssRef} className={successMsg ? 'sccssmsg' : 'desaparece'}>{successMsg}</p>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'desaparece'} aria-live='assertive'>{errMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
