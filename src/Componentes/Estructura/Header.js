import React from 'react';
import '../../Estilos/header.css'

const Header = () => {
  return(
      <header>
        <h2 className='logo'>SAGIT</h2>
        <nav className='navigation'>
          {/*<button className='btnLogin-popup'>Iniciar Sesión</button>*/}
        </nav>
      </header>
  );
};

export default Header;