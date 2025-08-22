import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
