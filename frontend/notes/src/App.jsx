import Signup from "./Views/Signup"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Views/Home"
import Login from "./Views/Login"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
