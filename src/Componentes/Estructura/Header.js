import React from 'react';
import '../../Estilos/header.css'
import { logOut } from '../../Funciones/funciones';

const Header = ({isLogged}) => {

  return(
      <header className={isLogged ? 'background' : ''}>
        <h2 className='logo'>SAGIT</h2>
        <nav className='navigation'>
          {
            isLogged 
            ? <div>
                <a href='/'>Home</a>
                <button className='btnLogin-popup'>
                  <p className='expand' onClick={logOut} >Cerrar Sesión</p>
                </button>
              </div>
            : <div></div>
          }
        </nav>
      </header>
  );
};

export default Header;