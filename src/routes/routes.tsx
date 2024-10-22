import Home from '@/page/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/page/Auth/auth';
import ClientAppointments from '@/page/ClientAppointments';
import BarberAppointments from '@/page/BarberAppointments';

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/client-appointments" element={<ClientAppointments />} />
        <Route
          path="/barber-shop-appointments/:barberShopId"
          element={<BarberAppointments />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
