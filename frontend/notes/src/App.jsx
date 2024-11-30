import Signup from "./Views/Signup"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Views/Home"
import Login from "./Views/Login"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
