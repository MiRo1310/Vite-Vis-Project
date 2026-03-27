// Konfigurationswerte
import { INavigation } from "@/components/shared/responsiveNav";

export const IOBROKER_HOST = "192.168.1.81";
export const IOBROKER_ADMIN_PORT = "8081";
export const IOBROKER_WS_PORT = "8084";

export const defaultLocale = "de-DE";

export const socketIo = `http://${IOBROKER_HOST}:${IOBROKER_ADMIN_PORT}/lib/js/socket.io.js`;

export const githubNavigation: INavigation = {
  label: "Feedback",
  externalLink: true,
  href: "https://github.com/MiRo1310/Vite-Vis-Project/issues/new",
  class: "text-blue-400",
};
