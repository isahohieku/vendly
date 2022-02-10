import type { AppProps } from 'next/app';
import { AnimateSharedLayout } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import '@styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (<AnimateSharedLayout>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </AnimateSharedLayout>);
}

export default App
