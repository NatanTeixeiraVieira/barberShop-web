import Home from '@/page/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/page/Auth/auth';
import DetailBarberShop from '@/components/detailsBarberShop/detailsBarberShop';
import Navbar from '@/components/navbar/navbar';
import BarberAppointments from '@/page/BarberAppointments';
import ClientAppointments from '@/page/ClientAppointments';
<<<<<<< HEAD
import FormBarberShop from '@/components/formBarberShop/formBarberShop';
import BarberShopProfile from '@/page/BarberShopProfile';
=======
import FormBarber from '@/page/FormBarber';
>>>>>>> 2311ba3298ad4c53ea7c2daad71ac54b97db0b7d

const routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Auth />} />
        <Route path="/auth/login" element={<Auth />} />
<<<<<<< HEAD
        <Route path="/auth/register-barber-shop" element={<FormBarberShop />} />
=======
        <Route path="/auth/register-barber-shop" element={<FormBarber/>} />
>>>>>>> 2311ba3298ad4c53ea7c2daad71ac54b97db0b7d
        <Route path="/details-barber-shop" element={<DetailBarberShop />} />
        <Route path="/client-appointments" element={<ClientAppointments />} />
        <Route
          path="/barber-shop-appointments/:barberShopId"
          element={<BarberAppointments />}
        />
        <Route
          path="/barber-shop-profile/:barberShopId"
          element={<BarberShopProfile />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
