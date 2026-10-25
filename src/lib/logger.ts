import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { type FrontendLogCreateDtoInput, type LoggingLevel } from "@/api/gql/graphql.ts";
import apolloClient from "@/apolloClient.ts";
import { getOrCreateDeviceId } from "@/lib/id.ts";
import { cutString } from "@/lib/string.ts";
import { type RouteLocationNormalizedGeneric, type RouteLocationNormalizedLoadedGeneric } from "vue-router";

type ConsoleType = "info" | "warn" | "error" | "debug";
const debugMode = false;

const level: Record<ConsoleType, LoggingLevel> = {
  error: "ERROR",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARNING",
};

export const Logger = (
  t: string,
  options?: {
    value?: unknown;
    e?: any;
    type?: ConsoleType;
    useDebugMode?: boolean;
    enableDbLogging?: boolean;
    onlyDbLogging?: boolean;
    to?: RouteLocationNormalizedGeneric;
    from?: RouteLocationNormalizedLoadedGeneric;
  },
  // eslint-disable-next-line complexity
): void => {
  const optionalDebug = options?.useDebugMode;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!optionalDebug || (optionalDebug && debugMode)) {
    if (!options?.onlyDbLogging) {
      // eslint-disable-next-line no-console
      console[options?.type ?? "log"](t, " ", options?.value ?? "");
    }

    if (!options) {
      return;
    }

    if (options.enableDbLogging) {
      try {
        void dbLoggingHandler.create({
          deviceId: getOrCreateDeviceId(),
          deviceName: cutString(navigator.userAgent, 100),
          level: options.type ? level[options.type] : "INFO",
          title: cutString(t, 100),
          appVersion: import.meta.env.VITE_APP_VERSION ?? "dev",
          description: (`From: ${options.from?.fullPath ?? "-"} to: ${options.to?.fullPath ?? "-"}, ` + options.e
            ? `Message: ${options.e?.message ?? "-"}, ` + `Stacktrace: ${options.e?.stack ?? "-"}`
            : "No errors"
          ).trim(),
          route: options.to?.fullPath,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Error DB Logging ", e);
      }
    }
    if (!options.e || options.onlyDbLogging) {
      return;
    }

    if (options.e.message) {
      // eslint-disable-next-line no-console
      console[options.type ?? "log"](`Error message: ${options.e.message}`);
    }
    if (options.e.stack) {
      // eslint-disable-next-line no-console
      console.error(`Error stack: ${options.e.stack}`);
    }
    if (!options.e.message && !options.e.stack) {
      // eslint-disable-next-line no-console
      console.error(`Error object: ${options.e}`);
    }
  }
};

function dbLogger() {
  provideApolloClient(apolloClient);
  const { mutate } = useMutation(
    graphql(`
      mutation CreateLog($dto: FrontendLogCreateDtoInput!) {
        createFrontendLog(dto: $dto) {
          id
        }
      }
    `),
  );

  const { mutate: removeById } = useMutation(
    graphql(`
      mutation RemoveFrontendLogByID($id: UUID!) {
        removeFrontendLog(id: $id)
      }
    `),
  );

  async function create(dto: FrontendLogCreateDtoInput) {
    return await mutate({ dto });
  }

  function remove(id: string) {
    return removeById({ id });
  }

  return { create, remove };
}

const dbLoggingHandler = dbLogger();
