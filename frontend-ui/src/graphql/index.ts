import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.BASE_URL,
    // uri: 'https://task-app-service.onrender.com/graphql',
    cache: new InMemoryCache({
        addTypename: false,
        resultCaching: false,
    }),
});
