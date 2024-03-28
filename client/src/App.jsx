import { BrowserRouter, Routes, Route } from "react-router-dom"
import LogIn from './pages/LogIn'
import SingIn from './pages/SingIn'


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LogIn/>}/>
        <Route path="/singIn" element={<SingIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App