import './App.css';
import { Routes, Route } from 'react-router-dom';
import MapView from './Componentes/Mapa/MapView';
import Login from './Vistas/Login';
import Layout from './Componentes/Layouts/Layout';
import RequireAuth from './Componentes/Proveedores/RequireAuth';
import RedirectLogin from './Componentes/Proveedores/RedirectLogin';

function App() {

  return(
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Rutas publicas */}
          <Route element={<RedirectLogin/>}>
            <Route path='/login' element={<Login />} />
          </Route>

          {/* Rutas protegidas por autorización */}
          <Route element={<RequireAuth />}>
            <Route path='/mapa' element={<MapView />}/>
            <Route path='/' element={<h2> Soy la pagina principal </h2>}/>
          </Route>
        </Route>
      </Routes> 
  );
}

export default App;
