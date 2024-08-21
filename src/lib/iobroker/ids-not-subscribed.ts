import { NotSubscribedIds } from "@/types";

export const notSubscribedIds: NotSubscribedIds = {
  esszimmer: { links: { shutterPosition: "0_userdata.0.Rolladen.Esszimmer.Position_anfahren" } },
  kinderzimmer: { fenster: { shutterPosition: "0_userdata.0.Rolladen.Kinderzimmer.Position_anfahren" } },
  kueche: {
    tuer: { shutterPosition: "0_userdata.0.Rolladen.Küche.Position_anfahren_Tür" },
    fenster: { shutterPosition: "0_userdata.0.Rolladen.Küche.Position_anfahren_Fenster" },
  },
  wohnzimmer: {
    ecke: { shutterPosition: "0_userdata.0.Rolladen.Wohnzimmer.Position_anfahren_Ecke" },
    links: { shutterPosition: "0_userdata.0.Rolladen.Wohnzimmer.Position_anfahren_links" },
    mittig: { shutterPosition: "0_userdata.0.Rolladen.Wohnzimmer.Position_anfahren_Mitte" },
    rechts: {
      shutterPosition: "0_userdata.0.Rolladen.Wohnzimmer.Position_anfahren_rechts",
    },
  },
  gaestezimmer: { fenster: { shutterPosition: "0_userdata.0.Rolladen.Gästezimmer.Position_anfahren" } },
  schlafen: {
    tuer: { shutterPosition: "0_userdata.0.Rolladen.Schlafzimmer.Position_anfahren_Tür" },
    fenster: { shutterPosition: "0_userdata.0.Rolladen.Schlafzimmer.Position_anfahren_Fenster" },
  },
  bad: { fenster: { shutterPosition: "0_userdata.0.Rolladen.Bad.Position_anfahren" } },
  abstellraumog: {
    links: { shutterPosition: "0_userdata.0.Rolladen.Abstellraum_OG.Position_anfahren_links" },
    rechts: { shutterPosition: "0_userdata.0.Rolladen.Abstellraum_OG.Position_anfahren_rechts" },
  },
};
