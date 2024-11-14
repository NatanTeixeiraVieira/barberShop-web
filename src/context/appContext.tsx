import { AppContextType } from "@/types/appContextType";
import { createContext, ReactNode, useContext, useState } from "react";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState('barber');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const [ isAuthenticate, setIsAuthenticate ] = useState(false);

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, showPassword, setShowPassword, togglePasswordVisibility, isAuthenticate, setIsAuthenticate, toggleConfirmPasswordVisibility, showConfirmPassword, setShowConfirmPassword }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
