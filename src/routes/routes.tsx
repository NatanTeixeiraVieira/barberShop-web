import Home from "@/page/home/Home"
import Login from "@/page/login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default routes
