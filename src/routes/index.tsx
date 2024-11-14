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
import RequireAuth from '@/components/required-auth';

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
        {/* <Route path="/favorite" element={<Favorite/>} /> */}

        <Route path="/client-appointments" element={<RequireAuth><ClientAppointments /></RequireAuth>} />
        <Route
          path="/barber-shop-appointments/:barberShopId"
          element={<RequireAuth><BarberAppointments /></RequireAuth>}
        />
        <Route
          path="/barber-shop-service/:barberShopId"
          element={<RequireAuth><BarberShopService /></RequireAuth>}
        />
        <Route
          path="/barber-shop-profile/:barberShopId"
          element={<RequireAuth><BarberShopProfile /></RequireAuth>}
        />
        <Route
          path="/client-profile"
          element={
            <RequireAuth>
              <ClientProfile />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
