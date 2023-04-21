import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import '../../Estilos/login.css';
import Icon from '@mdi/react';
import { mdiArrowULeftBottomBold, mdiLock, mdiLockReset } from '@mdi/js';
import { newPassword } from '../../Funciones/user';
import { ToastContainer, toast } from 'react-toastify';

const NewPassword = () => {

  const passwordRef = useRef();
  const repPasswordRef = useRef();
  const errRef = useRef();

  const params = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

   /* Para que el enfoque caiga en el input de usuario */
  useEffect(() =>{
    passwordRef.current.focus();
    document.title = "SAGIT | Recuperar contraseña"
  }, [params]);

  /* Limpía el mensaje de error una ves que el usurio se ubique en uno de los 
  inputs */
  useEffect(() =>{
    setErrMsg('');
  }, [password, repPassword]);

  const redirectSuccess = () => setTimeout(() => {
    navigate('/login')
  }, 5000);

  const handleSubmit = async(e) =>{
    e.preventDefault();

    if (password === repPassword) {
      newPassword(password, params.token).then(
        () => {
          setPassword('');
          setRepPassword('');
          toast.success('Se actualizó su contraseña', {style: {background: '#0f1f52'}});
          redirectSuccess();
        }
      ).catch((error) => {
        if (error.response.status === 500) {
          setErrMsg('Error interno en el servidor')
        } else {
          setErrMsg('Error interno en el servidor')
        }
      })
    } else {
      setErrMsg('Las contraseñas no coinciden');
    }
  };

  return (
    <div className='principal'>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <div className='wrapper'>
        <div className='form-box login'>
          <h1 className="titulo">SAGIT</h1>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <span className='icon'><Icon path={mdiLock} size={1.2} /> </span>
              <input 
              type='password'
              id='password'
              ref={passwordRef}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              />
              <label>&nbsp;Nueva contraseña</label>
            </div>
            <div className='input-box'>
              <span className='icon'><Icon path={mdiLockReset} size={1.2} /> </span>
              <input 
              type='password'
              id='repPassword'
              ref={repPasswordRef}
              autoComplete='off'
              onChange={(e) => setRepPassword(e.target.value)}
              value={repPassword}
              required
              />
              <label>&nbsp;Confirmación de contraseña</label>
            </div>
            <div className='forgot'>  
              <NavLink to='/login'>&nbsp;Regresar <Icon path={mdiArrowULeftBottomBold} size={1.1} /></NavLink>
            </div>
            <button className='boton'>Actualizar contraseña</button>
            {/* Mensaje de error desplegable */}
            <p ref={errRef} className={errMsg ? 'errmsg' : 'desaparece'} aria-live='assertive'>{errMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;