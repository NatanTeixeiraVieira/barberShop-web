'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormRegister from '@/components/form-register';
import FormLogin from '@/components/form-login';
import { useAuth } from './useAuth';
export default function Auth() {

  const {
    handleTabChange,
    activeTab
  } = useAuth();

  return (
    <section className='bg-primary h-full flex flex-col justify-center items-center'>
      <img src="/LogoBarbeiro.svg" alt="Logo" className='w-60' />
      <Card className="w-[350px] bg-white mb-8">
        <CardHeader>
          <CardTitle>Autenticação</CardTitle>
          <CardDescription>Faça login ou crie uma nova conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className={`${activeTab === 'login' ? 'bg-primary' : 'bg-white'}`}>Login</TabsTrigger>
              <TabsTrigger value="register" className={`${activeTab === 'register' ? 'bg-primary' : 'bg-white'}`}>Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <FormLogin />
            </TabsContent>
            <TabsContent value="register">
              <FormRegister />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
