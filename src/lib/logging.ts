type ConsoleType = "log" | "info" | "warn" | "error" | "debug";
export const logging = ({ e, title, type = "log" }: { e: any; title?: string; type?: ConsoleType }) => {
  // eslint-disable-next-line no-console
  console[type](title);
  // eslint-disable-next-line no-console
  console[type](`Error message: ${e.message}`);
  // eslint-disable-next-line no-console
  console[type](`Error stack: ${e.stack}`);
};
