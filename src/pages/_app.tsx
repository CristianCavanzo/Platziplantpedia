import { ApolloProvider } from '@apollo/client';
import { Layout } from '@components/layout';
import { apolloClient } from '@graphql/client';
import '@styles/global.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <ApolloProvider client={apolloClient}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ApolloProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
