import React, {useEffect,useState} from 'react';
import Icon from '@mdi/react';
import TimeOut from '../../Layouts/TimeOut';
import { NavLink, useNavigate } from 'react-router-dom';
import { addTools, getCurrentUser, logOut} from '../../../Functions';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { mdiAccountCircle, mdiLogout, mdiMapMarkerMultiple} from '@mdi/js';
import { objectRoutes } from './ObjectRoutesHeader';
import '../../../Styles/header.css'

/* Estructura de Header ocupada en todas las pantallas que lo neceten */
const Header = ({children, counter=null}) => {
  /* Se crea un estado local, que permite controlar los estados 
  de los Dropdowns*/
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  const navigate = useNavigate();

  /* Esta funcion se encarga de cambiar el estado de los dropdowns*/
  const toggleDropdownUser = () => setDropdownOpenUser(!dropdownOpenUser);

  /*Se crea un estado local, que permite controlar los estados de 
  la aparicion de reportes y filtros solo en el mapa*/
  const [hideElement, setHideElement] = useState(true);

  /*Esta funcion cambia el estado para la aparicion de reportes y 
  filtros solo en el mapa*/
  useEffect(() => {
    addTools(setHideElement)
  }, []);

  
  return(
    <section>
      <TimeOut></TimeOut>
      <header className='background'>
        <section className='cabecera-Nav'>
          <NavLink to='/mapa' className='logo'><strong>SAGIT</strong></NavLink>
          {
            !hideElement &&
            <label className="marcadores">
              <Icon path={mdiMapMarkerMultiple} size={1} />
              &nbsp;Marcadores: {counter}
            </label>
          }
        </section>
        <nav className='navigation'>
          {children}
          <label>
            <Dropdown isOpen={dropdownOpenUser} toggle={toggleDropdownUser}>
              <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenUser ? "transparent" : "transparent" }}>
              <Icon path={mdiAccountCircle} size={1} />
                  &nbsp;{getCurrentUser().session.username}
              </DropdownToggle>
              <DropdownMenu style={{zIndex: 1002}}>
                <DropdownItem header>Herramientas</DropdownItem>
                {
                  objectRoutes.map((object, index) => 
                    <DropdownItem key={index}>
                      <NavLink to={object.route} className={'nav-link'}>
                        <Icon path={object.icon} size={1} />
                        &nbsp;{object.name}
                      </NavLink>
                    </DropdownItem>
                  )
                }
                <DropdownItem header>Opciones de usuario</DropdownItem>
                <DropdownItem onClick={()=>logOut(navigate)}>
                  <Icon path={mdiLogout} size={1} />
                  &nbsp;Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </label>   
        </nav>
      </header>
    </section>     
  );
};

export default Header;