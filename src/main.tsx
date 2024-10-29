import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import { AppProvider } from './context/appContext.tsx';
import { FormBarberShopProvider } from './context/formBarberShopContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <FormBarberShopProvider>
          <App />
        </FormBarberShopProvider>
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
);
