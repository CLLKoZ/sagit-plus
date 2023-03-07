import { useEffect } from 'react';
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
            </section>
        </body>
    )
}

export default Inspecciones;