import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@graphql/client';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Cookie from 'js-cookie';
const changeLanguage = (locale: string) => {
    Cookie.set('NEXT_LOCALE', locale);
};

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                </ul>
                <div className="lenguage">
                    <Link href="/" locale="en-US">
                        <p onClick={() => changeLanguage('en-US')}>English</p>
                    </Link>
                    <Link href="/" locale="es">
                        <p onClick={() => changeLanguage('="es')}>Español</p>
                    </Link>
                </div>
            </nav>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
