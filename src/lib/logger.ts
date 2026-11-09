import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { graphql } from "@/api/gql";
import { type FrontendLogCreateDtoInput, type LoggingLevel } from "@/api/gql/graphql.ts";
import apolloClient from "@/apolloClient.ts";
import { getOrCreateDeviceId } from "@/lib/id.ts";
import { truncateText } from "@/lib/string.ts";
import { type RouteLocationNormalizedGeneric, type RouteLocationNormalizedLoadedGeneric } from "vue-router";

type ConsoleType = "info" | "warn" | "error" | "debug" | "log";

const level: Record<ConsoleType, LoggingLevel> = {
  error: "ERROR",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARNING",
  log: "INFO",
};

interface LoggerOptions {
  value?: unknown;
  useDebugMode?: boolean;
  enableDbLogging?: boolean;
  onlyDbLogging?: boolean;
  to?: RouteLocationNormalizedGeneric;
  from?: RouteLocationNormalizedLoadedGeneric;
}

export const Logger = {
  info: (message: string, e: any = null, options?: LoggerOptions) => logging(message, e, "info", options),
  log: (message: string, e: any = null, options?: LoggerOptions) => logging(message, e, "log", options),
  warn: (message: string, e: any = null, options?: LoggerOptions) => logging(message, e, "warn", options),
  error: (message: string, e: any = null, options?: LoggerOptions) => logging(message, e, "error", options),
  debug: (message: string, e: any = null, options?: LoggerOptions) => logging(message, e, "debug", options),
};

const logging = (message: string, e: any = null, type: ConsoleType, options: LoggerOptions = {}) => {
  if (options.useDebugMode === false) {
    return;
  }
  if (!options.onlyDbLogging) {
    // eslint-disable-next-line no-console
    console[type](message, " ", options.value ?? "");
  }

  dbLogging(message, type, e, options);

  if (!e || options.onlyDbLogging) {
    return;
  }

  errorLog("Error message:", e.message);
  errorLog("Error stack:", e.stack);
  if (!e.message && !e.stack) {
    errorLog("Error object:", e);
  }
};

const errorLog = (message: string, error: any) => {
  if (!error) {
    return;
  }
  // eslint-disable-next-line no-console
  console.error(message, error);
};

function getDescription(descriptionRoute: string, e: any) {
  return (descriptionRoute + (e ? `Message: ${e?.message ?? "-"}, ` + `Stacktrace: ${e?.stack ?? "-"}` : "No errors")).trim();
}

function getAppVersion() {
  return truncateText(20, import.meta.env.VITE_APP_VERSION ?? "development");
}

const dbLogging = (message: string, type: ConsoleType, e: any = null, options?: LoggerOptions): void => {
  if (!options?.enableDbLogging) {
    return;
  }
  try {
    const descriptionRoute = `From: ${options.from?.fullPath ?? "-"} to: ${options.to?.fullPath ?? "-"}, `;

    void getDbLoggingHandler()
      .create({
        deviceId: getOrCreateDeviceId(),
        deviceName: truncateText(512, navigator.userAgent),
        level: level[type],
        title: truncateText(100, message),
        appVersion: getAppVersion(),
        description: getDescription(descriptionRoute, e),
        route: truncateText(255, options.to?.fullPath),
      })
      .catch((error) => {
        errorLog("Error DB Logging", error);
      });
  } catch (error) {
    errorLog("Error DB Logging", error);
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

// Lazy, damit apolloClient.ts den Logger importieren kann, ohne dass der zirkuläre Import beim Modul-Laden knallt
let dbLoggingHandler: ReturnType<typeof dbLogger> | null = null;

function getDbLoggingHandler() {
  dbLoggingHandler ??= dbLogger();
  return dbLoggingHandler;
}
