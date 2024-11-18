import { useAppContext } from '@/context/appContext';
import { redirectUser } from '@/utils/redirect';
import { ReactNode, useEffect } from 'react';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticate, setIsAuthenticate } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem('client');

    if (token) {
      setIsAuthenticate(true);
      console.log(isAuthenticate);
    } else {
      setIsAuthenticate(false);
      redirectUser('/auth/login', 0);
    }
  }, [isAuthenticate, setIsAuthenticate]);

  if (!isAuthenticate) return null;

  return <>{children}</>;
}
