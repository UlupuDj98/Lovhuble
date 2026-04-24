import { Toaster as SonnerToaster } from 'sonner';

export const Toaster = () => {
  return (
    <SonnerToaster 
      position="top-center"
      toastOptions={{
        style: {
          background: '#1d1d1f',
          color: '#ffffff',
          border: 'none',
          borderRadius: '12px',
          padding: '16px 20px',
          fontSize: '15px',
          fontWeight: '400',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        },
        className: 'toast',
      }}
      richColors
      closeButton
    />
  );
};
