type ConsoleType = "log" | "info" | "warn" | "error" | "debug";
const debugMode = false;
// eslint-disable-next-line complexity
export const Logger = (t: string, options?: { value?: unknown; e?: any; type?: ConsoleType; useDebugMode?: boolean }): void => {
  if (!options?.useDebugMode || (options?.useDebugMode && debugMode)) {
    // eslint-disable-next-line no-console
    console[options?.type ?? "log"](t, " ", options?.value);
    if (!options?.e) {
      return;
    }
    if (options.e.message) {
      // eslint-disable-next-line no-console
      console[options?.type ?? "log"](`Error message: ${options.e.message}`);
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
