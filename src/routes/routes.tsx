import Home from '@/page/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/page/Auth/auth';
import ClientAppointments from '@/page/ClientAppointments';

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/client-appointments" element={<ClientAppointments />} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
