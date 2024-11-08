import { useAppContext } from '@/context/appContext';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticate, setIsAuthenticate } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticate(true);
      console.log(isAuthenticate)
    } else {
      setIsAuthenticate(false);
      navigate('/auth/login');
    }
  }, [navigate, setIsAuthenticate]);

  if (!isAuthenticate) return null;

  return <>{children}</>;
}
