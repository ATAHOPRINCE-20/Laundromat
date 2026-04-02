import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Redirect to landing page if accessing root and not logged in
    const currentUser = localStorage.getItem('currentUser');
    const currentPath = window.location.pathname;
    
    if (!currentUser && currentPath === '/' && !window.location.pathname.includes('landing')) {
      window.location.href = '/landing';
    }
  }, []);

  return <RouterProvider router={router} />;
}