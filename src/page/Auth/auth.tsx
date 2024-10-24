'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormRegister from '@/components/formRegister/formRegister';
import FormLogin from '@/components/formLogin/formLogin';
import { useAppContext } from '@/context/appContext';
import { useLocation } from 'react-router-dom';
import React from 'react';

export default function Auth() {
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

  return (
    <section className='bg-primary h-full flex flex-col justify-center items-center'>
      <img src="/LogoBarbeiro.svg" alt="Logo" className='w-60'/>
      <Card className="w-[350px] bg-white">
        <CardHeader>
          <CardTitle>Autenticação</CardTitle>
          <CardDescription>Faça login ou crie uma nova conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className={`${activeTab === 'login' ? 'bg-primary': 'bg-white'}`}>Login</TabsTrigger>
              <TabsTrigger value="register" className={`${activeTab === 'register' ? 'bg-primary': 'bg-white'}`}>Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <FormLogin/>
            </TabsContent>
            <TabsContent value="register">
              <FormRegister/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
