import { BrowserRouter, Routes, Route } from "react-router-dom"
import LogIn from './pages/LogIn'
import SingIn from './pages/SingIn'
import MainPage from "./pages/MainPage"


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/singIn" element={<SingIn/>}/>
        <Route path="/mainPage" element={<MainPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App