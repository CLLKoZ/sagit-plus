import React from 'react';
import '../../Estilos/header.css'
import { logOut } from '../../Funciones/funciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faFilter, faCircleXmark, faFile } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../../Funciones/funciones';

/* Estructura de Header ocupada en todas las pantallas que lo neceten */
const Header = () => {

  return(
    <section>
      <header className={'background'}>
        <NavLink to='/' className='logo'>SAGIT</NavLink>
        <nav className='navigation'>
          <div>
            <label htmlFor='btnFiltro' className="filtro" type="button">
              <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
              &nbsp;Filtros
            </label>
            <label className="btnLogin-popup" type="button">
              <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
              &nbsp;Reportes</label>
            <label type="button" className='btnLogin-popup'>
              <p className='expand' onClick={logOut} >
              <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
              &nbsp;{getCurrentUser().session.username}</p>
            </label>
          </div>
        </nav>
      </header>
    </section>
      
  );
};

export default Header;