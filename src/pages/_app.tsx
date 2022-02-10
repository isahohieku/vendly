import type { AppProps } from 'next/app';
import { AnimateSharedLayout } from 'framer-motion';
import '@styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (<AnimateSharedLayout>
    <Component {...pageProps} />
  </AnimateSharedLayout>);
}

export default App
