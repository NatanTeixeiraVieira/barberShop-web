import Home from "@/page/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "@/page/Auth/auth"
import DetailBarberShop from "@/components/detailsBarberShop/detailsBarberShop"

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/details-barber-shop" element={<DetailBarberShop/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default routes
