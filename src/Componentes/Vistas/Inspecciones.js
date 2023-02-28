import { useEffect } from 'react';
import { allInspections } from '../../Funciones/funciones';

const Inspecciones = () => {
    useEffect(() => {
        allInspections();
    }, [])

    return(
        <div>Inspecciones</div>
    )
}

export default Inspecciones;