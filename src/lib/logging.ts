type ConsoleType = "log" | "info" | "warn" | "error" | "debug";
export const logging = ({ e, title, type = "log" }: { e?: any; title?: string; type?: ConsoleType }) => {
  // eslint-disable-next-line no-console
  console[type](title);
  if (!e) {
    return;
  }
  if (e.message) {
    // eslint-disable-next-line no-console
    console[type](`Error message: ${e.message}`);
  }
  if (e.stack) {
    // eslint-disable-next-line no-console
    console[type](`Error stack: ${e.stack}`);
  }
  if (!e.message && !e.stack) {
    // eslint-disable-next-line no-console
    console[type](`Error object: ${e}`);
  }
};
