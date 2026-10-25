import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { type FrontendLogCreateDtoInput, type LoggingLevel } from "@/api/gql/graphql.ts";
import apolloClient from "@/apolloClient.ts";
import { getOrCreateDeviceId } from "@/lib/id.ts";
import { truncateText } from "@/lib/string.ts";
import { type RouteLocationNormalizedGeneric, type RouteLocationNormalizedLoadedGeneric } from "vue-router";

type ConsoleType = "info" | "warn" | "error" | "debug" | "log";
const debugMode = false;

const level: Record<ConsoleType, LoggingLevel> = {
  error: "ERROR",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARNING",
  log: "INFO",
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
    const type = options?.type ?? "log";
    if (!options?.onlyDbLogging) {
      // eslint-disable-next-line no-console
      console[type](t, " ", options?.value ?? "");
    }

    if (!options) {
      return;
    }

    if (options.enableDbLogging) {
      try {
        const descriptionRoute = `From: ${options.from?.fullPath ?? "-"} to: ${options.to?.fullPath ?? "-"}, `;

        void dbLoggingHandler
          .create({
            deviceId: getOrCreateDeviceId(),
            deviceName: truncateText(512, navigator.userAgent),
            level: options.type ? level[options.type] : "INFO",
            title: truncateText(100, t),
            appVersion: truncateText(20, import.meta.env.VITE_APP_VERSION ?? "development"),
            description: (
              descriptionRoute + (options.e ? `Message: ${options.e?.message ?? "-"}, ` + `Stacktrace: ${options.e?.stack ?? "-"}` : "No errors")
            ).trim(),
            route: truncateText(255, options.to?.fullPath),
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error("Error DB Logging ", e);
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
      console[type](`Error message: ${options.e.message}`);
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
