import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}`,
});
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
    };
});
export const apolloClient = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache({}),
});
