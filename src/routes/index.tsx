import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/page/auth';
import DetailBarberShop from '@/components/details-barber-shop';
import Navbar from '@/components/navbar';
import BarberAppointments from '@/page/barber-appointments';
import ClientAppointments from '@/page/client-appointments';
import BarberShopProfile from '@/page/barber-shop-profile';
import RegisterBarberShop from '@/page/form-barber';
import ClientProfile from '@/page/client-profile';
import BarberShopService from '@/page/barber-service';
import Home from '@/page/home';

const routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Auth />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route
          path="/auth/register-barber-shop"
          element={<RegisterBarberShop />}
        />
        <Route
          path="/details-barber-shop/:barberShopId"
          element={<DetailBarberShop />}
        />
        <Route path="/client-appointments" element={<ClientAppointments />} />
        <Route
          path="/barber-shop-appointments/:barberShopId"
          element={<BarberAppointments />}
        />
        <Route
          path="/barber-shop-service/:barberShopId"
          element={<BarberShopService />}
        />
        <Route
          path="/barber-shop-profile/:barberShopId"
          element={<BarberShopProfile />}
        />
        <Route path="/client-profile/:clientId" element={<ClientProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
