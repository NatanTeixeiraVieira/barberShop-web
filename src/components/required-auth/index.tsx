import { useAppContext } from '@/context/appContext';
import { redirectUser } from '@/utils/redirect';
import { ReactNode, useEffect } from 'react';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticate, setIsAuthenticate } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticate(true);
      console.log(isAuthenticate)
    } else {
      setIsAuthenticate(false);
      redirectUser("/auth/login", 0)
    }
  }, [redirectUser, setIsAuthenticate]);

  if (!isAuthenticate) return null;

  return <>{children}</>;
}
