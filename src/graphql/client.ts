import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}/content/v1/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}`,
});
const authLink = setContext((_, { headers }) => {
    let Authorization = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
    if (_.variables?.preview === true) {
        Authorization = `Bearer ${process.env.ACCESS_TOKEN_PREVIEW}`;
    }
    return {
        headers: {
            ...headers,
            Authorization,
        },
    };
});
export const apolloClient = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    plant: {
                        read: (_, { args, toReference }) => {
                            return toReference({
                                __typename: 'Plant',
                                id: args?.id,
                            });
                        },
                    },
                },
            },
        },
    }),
});
