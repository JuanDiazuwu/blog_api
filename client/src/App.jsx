/* Las librerías usadas son React-Router-DOM para poder navegar a traves de
 * las rutas desde una ruta a otra, mientras que las demas son imports de
 * componentes en la carpeta de pages que contiene los componentes de las
 * rutas respectivas
*/
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LogIn from './pages/LogIn'
import SingIn from './pages/SingIn'
import MainPage from "./pages/MainPage"
import Publicate from "./pages/Publicate"
import Publication from "./pages/Publication"

// Aquí se define el componente App que contiene a todas las rutas
function App() {
  return (
    // Esta etiqueta forma el header de la aplicación mientras que
    // Browser Router es un componente de la librería Routes que
    // maneja las rutas existentes
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <a href="/mainPage" className="text-3xl font-black font-mono">Blogtex</a>
        <a href="/" className="text-lg font-bold bg-emerald-800 text-white px-3 py-1 rounded-2xl">LogIn</a>
      </header>
      <div className="py-4">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/singIn" element={<SingIn/>}/>
            <Route path="/mainPage" element={<MainPage/>}/>
            <Route path="/publicatePage" element={<Publicate/>}/>
            <Route path="/publicationPage" element={<Publication/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}
export default App