import './App.css';
import { Routes, Route } from 'react-router-dom';
import MapView from './Componentes/Mapa/MapView';
import Login from './Componentes/Vistas/Login';
import Layout from './Componentes/Layouts/Layout';
import RequireAuth from './Componentes/Proveedores/RequireAuth';
import RedirectLogin from './Componentes/Proveedores/RedirectLogin';
import NotFound from './Componentes/Vistas/NotFound';
import Forgot from './Componentes/Vistas/Forgot';

function App() {

  return(
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Rutas publicas */}
          <Route element={<RedirectLogin/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/forgot' element={<Forgot />} />
          </Route>

          {/* Rutas protegidas por autorización */}
          <Route element={<RequireAuth />}>
            <Route path='/mapa' element={<MapView />}/>
            <Route element={<RedirectLogin />}>
              <Route path='/' element={<div></div>}/>
            </Route>
            <Route path='*' element={<NotFound />}/>
          </Route>
        </Route>
      </Routes> 
  );
}

export default App;
