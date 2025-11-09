import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <Toaster position='top-center' />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
