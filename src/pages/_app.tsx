import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient } from '@graphql/client';
import type { AppProps } from 'next/app';
import '@styles/global.css';
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}
