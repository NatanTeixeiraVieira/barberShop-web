import Home from "@/page/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "@/page/Auth/auth"
import DetailBarberShop from "@/components/detailsBarberShop/detailsBarberShop"
import Navbar from "@/components/navbar/navbar"

const routes = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth/register" element={<Auth/>}/>
        <Route path="/auth/login" element={<Auth/>}/>
        <Route path="/details-barber-shop" element={<DetailBarberShop/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default routes
