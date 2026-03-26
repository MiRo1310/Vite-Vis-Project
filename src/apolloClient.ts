import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error] ${operation.operationName}:`, error.message);
    });
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network error] ${operation.operationName}:`, networkError);
  }
});

export default apolloClient;
