import { Outlet } from "react-router-dom";

/* Le da la estructura a todo lo que está dentro de App.js encerrando 
cada una de las cosas que pinta las rutas en una etiqueta main */
const Layout = () => {
    return(
        <main className="App">
            <Outlet/>
        </main>
    )
}

export default Layout;