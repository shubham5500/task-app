import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache({
        addTypename: false,
        resultCaching: false,
    }),
});