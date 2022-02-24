import type { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>carlosvilas.dev</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
