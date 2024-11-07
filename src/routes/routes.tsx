import Home from '@/page/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/page/Auth/auth';
import DetailBarberShop from '@/components/detailsBarberShop/detailsBarberShop';
import Navbar from '@/components/navbar/navbar';
import BarberAppointments from '@/page/BarberAppointments';
import ClientAppointments from '@/page/ClientAppointments';
import BarberShopProfile from '@/page/BarberShopProfile';
import CadastroBarbearia from '@/page/FormBarber';
import ClientProfile from '@/page/ClientProfile';
import BarberShopService from '@/page/BarberService';

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
          element={<CadastroBarbearia />}
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
