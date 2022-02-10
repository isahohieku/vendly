import Navbar from '@organisms/navbar';
import Head from 'next/head'

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className='wrapper'>
            <Head>
                <title>Vendly Survey App</title>
                <meta name="description" content="Vendly Assessment" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Navbar */}
            <Navbar />
            {children}
        </div>
    );
}

export default Layout;