import { from, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { useToast } from "@/components/ui/toast";
import { Logger } from "@/lib/logger.ts";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL as string,
});

/**
 * Mit `context: { silentErrors: true }` zeigt eine Operation keinen globalen Fehler-Toast,
 * z. B. wenn „nicht gefunden“ ein erwartetes Ergebnis ist und die Komponente selbst Feedback gibt.
 */
export interface ApolloOperationContext {
  silentErrors?: boolean;
}

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  const { toast } = useToast();
  const { silentErrors } = operation.getContext() as ApolloOperationContext;
  if (graphQLErrors && silentErrors) {
    Logger.info(`[GraphQL] ${operation.operationName}`, null, { value: graphQLErrors });
  } else if (graphQLErrors) {
    Logger.error("Graphql Error", null, { value: graphQLErrors });
    toast({ title: "GraphQL Error", variant: "destructive", description: graphQLErrors[0].message, duration: 20000 });
  }

  if (networkError) {
    Logger.error(`[Network error] ${operation.operationName}:`, networkError);
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
