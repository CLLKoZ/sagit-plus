import './App.css';
import { Routes, Route } from 'react-router-dom';
import MapView from './Componentes/Mapa/MapView';
import Login from './Vistas/Login';
import Layout from './Componentes/Layouts/Layout';

function App() {

  return(
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Rutas publicas */}
          <Route path='/login' element={<Login />} />

          {/* Rutas protegidas por autorización */}
          <Route path='/' element={<MapView />}/>
        </Route>
      </Routes> 
  );
}

export default App;
