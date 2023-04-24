import './Styles/App.css';
import { Routes, Route } from 'react-router-dom';
import MapView from './Components/Views/Map/MapView';
import Login from './Components/Views/Sessions/Login';
import Layout from './Components/Layouts/Layout';
import RequireAuth from './Components/Providers/RequireAuth';
import RedirectLogin from './Components/Providers/RedirectLogin';
import NotFound from './Components/Views/General/NotFound';
import Forgot from './Components/Views/Sessions/Forgot';
import NewPassword from './Components/Views/Sessions/NewPassword';

function App() {

  return(
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Rutas publicas */}
          <Route element={<RedirectLogin/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/reiniciar-contra/:token' element={<NewPassword />} />
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
