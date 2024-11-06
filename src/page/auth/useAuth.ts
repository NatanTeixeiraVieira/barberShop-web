import { useAppContext } from "@/context/appContext";
import React from "react";
import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const {activeTab, setActiveTab, setShowPassword} = useAppContext();

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/auth/register') {
      setActiveTab('register')
    } else if (location.pathname === '/auth/login') {
      setActiveTab('login')
    }
    setShowPassword(false)
  }, [location.pathname, setActiveTab, setShowPassword])


  const handleTabChange = (currentTab: string) => {
    setActiveTab(currentTab);
    setShowPassword(false)
  }
  return {
    handleTabChange,
    activeTab
  }
}

