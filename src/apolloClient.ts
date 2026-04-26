import { from, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { useToast } from "@/components/ui/toast";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const { toast } = useToast();
  if (graphQLErrors) {
    // eslint-disable-next-line no-console
    console.error("Graphql Error", graphQLErrors);
    toast({ title: "GraphQL Error", variant: "destructive", description: graphQLErrors[0].message, duration: 20000 });
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.error(`[Network error] ${operation.operationName}:`, networkError);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
