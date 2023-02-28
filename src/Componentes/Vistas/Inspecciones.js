import { useEffect } from 'react';
import { allInspections } from '../../Funciones/funciones';



const Inspecciones = () => {
    useEffect(() => {
        console.log('soy el token')
        allInspections();
    }, [])

    return(
        <div>Inspecciones</div>
    )
}

export default Inspecciones;