import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const ScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return null;
};
