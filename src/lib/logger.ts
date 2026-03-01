type ConsoleType = "log" | "info" | "warn" | "error" | "debug";
// eslint-disable-next-line complexity
export const Logger = (t: string, options?: { e?: any; text?: string; type?: ConsoleType }): void => {
  // eslint-disable-next-line no-console
  console[options?.type ?? "log"](t ?? options?.text);
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
};
