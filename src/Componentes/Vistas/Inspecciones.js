import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { allInspections } from '../../Funciones/funciones';
import Header from '../Estructura/Header';


const Inspecciones = () => {
    useEffect(() => {
        allInspections();
    }, [])

    return(
        <body>
            <Header isLogged={true}></Header>
            <section className='contenido'>
                <div>Inspecciones</div>
                <NavLink to="/mapa">MAPA</NavLink>
            </section>
        </body>
    )
}

export default Inspecciones;