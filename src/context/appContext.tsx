import { ContextType } from "@/@types/contextType";
import { createContext, ReactNode, useContext, useState } from "react";

export const AppContext = createContext<ContextType | undefined>( undefined );

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return(
    <AppContext.Provider value={{ activeTab, setActiveTab, showPassword, setShowPassword, togglePasswordVisibility }}>
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
