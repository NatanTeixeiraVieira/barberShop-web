import Home from "@/page/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "@/page/Auth/auth"

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default routes
