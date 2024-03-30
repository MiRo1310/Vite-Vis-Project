export const idToSubscribe: IdToSubscribe[] = [
  {
    objectNameInStore: "iobrokerValues",
    value: [{ id: "javascript.0.Geraete.WetterCom.temp_value", firstKeyInObject: "Aussentemperatur" }],
  },
  { objectNameInStore: "trash", value: [{ id: "trashschedule.0.type.json" }] },
  { objectNameInStore: "shoppingList", value: [{ id: "alexa-shoppinglist.0.list_activ" }] },
  { objectNameInStore: "urlaubAktiv", value: [{ id: "0_userdata.0.Urlaub.Urlaub_aktiv" }] },

  {
    // Timer
    objectNameInStore: "showTimerCard",
    value: [{ id: "alexa-timer-vis.0.all_Timer.alive" }],
  },

  {
    // Timer 1
    objectNameInStore: "timer",
    value: [
      { id: "alexa-timer-vis.0.timer1.string_2", firstKeyInObject: "timer1", subKey: "string" },
      { id: "alexa-timer-vis.0.timer1.TimeEnd", firstKeyInObject: "timer1", subKey: "timeEnd" },
      { id: "alexa-timer-vis.0.timer1.TimeStart", firstKeyInObject: "timer1", subKey: "timeStart" },
      { id: "alexa-timer-vis.0.timer1.InputDeviceName", firstKeyInObject: "timer1", subKey: "device" },
      { id: "alexa-timer-vis.0.timer1.name", firstKeyInObject: "timer1", subKey: "name" },
    ],
  },

  {
    // Timer 2
    objectNameInStore: "timer",
    value: [
      { id: "alexa-timer-vis.0.timer2.string_2", firstKeyInObject: "timer2", subKey: "string" },
      { id: "alexa-timer-vis.0.timer2.TimeEnd", firstKeyInObject: "timer2", subKey: "timeEnd" },
      { id: "alexa-timer-vis.0.timer2.TimeStart", firstKeyInObject: "timer2", subKey: "timeStart" },
      { id: "alexa-timer-vis.0.timer2.InputDeviceName", firstKeyInObject: "timer2", subKey: "device" },
      { id: "alexa-timer-vis.0.timer2.name", firstKeyInObject: "timer2", subKey: "name" },
    ],
  },
  {
    // Timer 3
    objectNameInStore: "timer",
    value: [
      { id: "alexa-timer-vis.0.timer3.string_2", firstKeyInObject: "timer3", subKey: "string" },
      { id: "alexa-timer-vis.0.timer3.TimeEnd", firstKeyInObject: "timer3", subKey: "timeEnd" },
      { id: "alexa-timer-vis.0.timer3.TimeStart", firstKeyInObject: "timer3", subKey: "timeStart" },
      { id: "alexa-timer-vis.0.timer3.InputDeviceName", firstKeyInObject: "timer3", subKey: "device" },
      { id: "alexa-timer-vis.0.timer3.name", firstKeyInObject: "timer3", subKey: "name" },
    ],
  },
  {
    // Timer 4
    objectNameInStore: "timer",
    value: [
      { id: "alexa-timer-vis.0.timer4.string_2", firstKeyInObject: "timer4", subKey: "string" },
      { id: "alexa-timer-vis.0.timer4.TimeEnd", firstKeyInObject: "timer4", subKey: "timeEnd" },
      { id: "alexa-timer-vis.0.timer4.TimeStart", firstKeyInObject: "timer4", subKey: "timeStart" },
      { id: "alexa-timer-vis.0.timer4.InputDeviceName", firstKeyInObject: "timer4", subKey: "device" },
      { id: "alexa-timer-vis.0.timer4.name", firstKeyInObject: "timer4", subKey: "name" },
    ],
  },
  {
    // Fenster
    objectNameInStore: "fensterOffen",
    value: [{ id: "0_userdata.0.Fenster.Sind_Fenster_offen" }],
  },
  {
    objectNameInStore: "fenster",
    value: [
      {
        id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster klein open.ACTUAL",
        room: "wohnzimmer",
        subKey: "ecke",
      },
      {
        id: "alias.0.Gäste WC.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL",
        room: "gaesteWc",
        subKey: "rechts",
      },
      {
        id: "alias.0.Gäste WC.Xiaomi AqaraSensoren.Fenster links open.ACTUAL",
        room: "gaesteWc",
        subKey: "links",
      },
      {
        id: "zigbee.0.00158d0003cb431e.opened",
        room: "buero",
        subKey: "fenster",
      },
      {
        id: "alias.0.Schlafzimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL",
        room: "schlafen",
        subKey: "fenster",
      },
      {
        id: "alias.0.Schlafzimmer.Xiaomi AqaraSensoren.Tür open.ACTUAL",
        room: "schlafen",
        subKey: "tuer",
      },
      {
        id: "alias.0.Keller.Xiaomi AqaraSensoren.Tür open.Kellertür open",
        room: "keller",
        subKey: "tuer",
      },
      {
        id: "alias.0.Kinderzimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL",
        room: "kinderzimmer",
        subKey: "fenster",
      },
      {
        id: "alias.0.Bad.Xiaomi AqaraSensoren.Fenster open.ACTUAL",
        room: "bad",
        subKey: "fenster",
      },
      {
        id: "alias.0.Gästezimmer.Xiaomi AqaraSensoren.Fenster open.ACTUAL",
        room: "gaestezimmer",
        subKey: "fenster",
      },
      {
        id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster links open.ACTUAL",
        room: "wohnzimmer",
        subKey: "links",
      },
      {
        id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL",
        room: "wohnzimmer",
        subKey: "rechts",
      },
      {
        id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster mitte open.ACTUAL",
        room: "wohnzimmer",
        subKey: "mittig",
      },
      {
        id: "alias.0.Wohnzimmer.Xiaomi AqaraSensoren.Fenster klein open.ACTUAL",
        room: "wohnzimmer",
        subKey: "ecke",
      },
      {
        id: "alias.0.Esszimmer.Xiaomi AqaraSensoren.Links open.ACTUAL",
        room: "esszimmer",
        subKey: "links",
      },
      {
        id: "alias.0.Esszimmer.Xiaomi AqaraSensoren.Rechts open.ACTUAL",
        room: "esszimmer",
        subKey: "rechts",
      },
      {
        id: "alias.0.Küche.Xiaomi AqaraSensoren.Tür open.ACTUAL",
        room: "kueche",
        subKey: "tuer",
      },
      {
        id: "alias.0.Küche.Xiaomi AqaraSensoren.Fenster open.ACTUAL",
        room: "kueche",
        subKey: "fenster",
      },
      {
        id: "alias.0.Abstellraum.Xiaomi AqaraSensoren.Fenster open.ACTUAL",
        room: "abstellraum",
        subKey: "fenster",
      },
      {
        id: "alias.0.Abstellraum OG.Xiaomi AqaraSensoren.Fenster links open.ACTUAL",
        room: "abstellraumog",
        subKey: "links",
      },
      {
        id: "alias.0.Abstellraum OG.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL",
        room: "abstellraumog",
        subKey: "rechts",
      },
      {
        id: "alias.0.Dachboden.Xiaomi AqaraSensoren.Fenster links open.ACTUAL",
        room: "dachboden",
        subKey: "links",
      },
      {
        id: "alias.0.Dachboden.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL",
        room: "dachboden",
        subKey: "rechts",
      },
      {
        id: "alias.0.Flur.Xiaomi AqaraSensoren.Fenster links open.ACTUAL",
        room: "flur",
        subKey: "links",
      },
      {
        id: "alias.0.Flur.Xiaomi AqaraSensoren.Fenster rechts open.ACTUAL",
        room: "flur",
        subKey: "rechts",
      },
      {
        id: "alias.0.Keller.Xiaomi AqaraSensoren.Keller Treppe.Fenster.KellerTreppe Fenster",
        room: "keller",
        subKey: "flurFenster",
      },
    ],
  },
  {
    // Rolladen
    objectNameInStore: "rolladen",
    value: [
      { id: "s7.1.DBs.DB1.B150", room: "wohnzimmer", subKey: "mittig", saveId: true },
      { id: "s7.1.DBs.DB1.B152", room: "wohnzimmer", subKey: "ecke", saveId: true },
      { id: "s7.1.DBs.DB1.B159", room: "wohnzimmer", subKey: "links", saveId: true },
      { id: "s7.1.DBs.DB1.B157", room: "wohnzimmer", subKey: "rechts", saveId: true },
      { id: "s7.1.DBs.DB1.B129", room: "kueche", subKey: "tuer", saveId: true },
      { id: "s7.1.DBs.DB1.B145", room: "kueche", subKey: "fenster", saveId: true },
      {
        id: "s7.1.DBs.DB1.B136",
        room: "esszimmer",
        subKey: "links",
        saveId: true /*Einfach links für angenommen als Rollade*/,
      },
      { id: "s7.1.DBs.DB1.B164", room: "kinderzimmer", subKey: "fenster", saveId: true },
      { id: "s7.1.DBs.DB1.B169", room: "schlafen", subKey: "tuer", saveId: true },
      { id: "s7.2.DBs.DB1.B065", room: "schlafen", subKey: "fenster", saveId: true },
      { id: "s7.2.DBs.DB1.B073", room: "abstellraumog", subKey: "links", saveId: true },
      { id: "s7.2.DBs.DB1.B057", room: "abstellraumog", subKey: "rechts", saveId: true },
      { id: "s7.2.DBs.DB1.B078", room: "bad", subKey: "fenster", saveId: true },
      { id: "s7.2.DBs.DB1.B150", room: "gaestezimmer", subKey: "fenster", saveId: true },
    ],
  },
  {
    // Sonnenuntergang
    objectNameInStore: "sonnenuntergang",
    value: [{ id: "0_userdata.0.Rolladen.Zeit_Rollade_auto_herunter" }],
  },
  {
    // Zeitversatz Rolladen Auto herunter fahren
    objectNameInStore: "shutterAutoDownTime",
    value: [
      {
        id: "0_userdata.0.Rolladen.Esszimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "esszimmer",
        subKey: "linksDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "kueche",
        subKey: "fensterDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "schlafen",
        subKey: "fensterDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "schlafen",
        subKey: "tuerDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Kinderzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "kinderzimmer",
        subKey: "fensterDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Bad.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "bad",
        subKey: "fensterDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "wohnzimmer",
        subKey: "eckeDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "wohnzimmer",
        subKey: "linksDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "wohnzimmer",
        subKey: "mittigDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "wohnzimmer",
        subKey: "rechtsDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Küche.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(Tür)",
        room: "kueche",
        subKey: "tuerDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(links)",
        room: "abstellraumog",
        subKey: "linksDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeitversatz_herunterfahren_zum_Sonnenuntergang_(rechts)",
        room: "abstellraumog",
        subKey: "rechtsDelay",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Gästezimmer.Zeitversatz_herunterfahren_zum_Sonnenuntergang",
        room: "gaestezimmer",
        subKey: "fensterDelay",
        saveId: true,
      },
    ],
  },
  {
    // Auto herunterfahren Rolladen
    objectNameInStore: "shutterAutoDownTime",
    value: [
      {
        id: "0_userdata.0.Rolladen.Esszimmer.Esszimmer_Rolladen_Zeitsteuerung",
        room: "esszimmer",
        subKey: "linksAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Küche.Fenster_Rolladen_Zeitsteuerung",
        room: "kueche",
        subKey: "fensterAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Schlafzimmer_Rolladen_Zeitsteuerung",
        room: "schlafen",
        subKey: "tuerAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Kinderzimmer.Rollade_automisch_runter",
        room: "kinderzimmer",
        subKey: "fensterAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Bad.Bad_Rolladen_Zeitsteuerung",
        room: "bad",
        subKey: "fensterAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
        room: "wohnzimmer",
        subKey: "eckeAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
        room: "wohnzimmer",
        subKey: "linksAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
        room: "wohnzimmer",
        subKey: "mittigAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Wohnzimmer_Rolladen_Zeitsteuerung",
        room: "wohnzimmer",
        subKey: "rechtsAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Küche.Tür_Rolladen_Zeitsteuerung",
        room: "kueche",
        subKey: "tuerAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_links_Rolladen_Zeitsteuerung_aktiv",
        room: "abstellraumog",
        subKey: "linksAuto",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Abstellraum_OG_rechts_Rolladen_Zeitsteuerung_aktiv",
        room: "abstellraumog",
        subKey: "rechtsAuto",
        saveId: true,
      },
    ],
  },
  {
    // Zeit Auto hochfahren Rolladen
    objectNameInStore: "shutterAutoUp",
    value: [
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
        room: "wohnzimmer",
        subKey: "eckeAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
        room: "wohnzimmer",
        subKey: "linksAutoUp",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
        room: "wohnzimmer",
        subKey: "mittigAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Wohnzimmer.Zeit_Rollade_hoch",
        room: "wohnzimmer",
        subKey: "rechtsAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch",
        room: "schlafen",
        subKey: "tuerAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Schlafzimmer.Zeit_Rollade_hoch",
        room: "schlafen",
        subKey: "fensterAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Fenster",
        room: "kueche",
        subKey: "fensterAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Küche.Zeit_Rollade_hoch_Tür",
        room: "kueche",
        subKey: "tuerAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Kinderzimmer.Zeit_Rollade_hoch",
        room: "kinderzimmer",
        subKey: "fensterAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Esszimmer.Zeit_Rollade_hoch",
        room: "esszimmer",
        subKey: "linksAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Bad.Zeit_Rollade_hoch",
        room: "bad",
        subKey: "fensterAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_rechts",
        room: "abstellraumog",
        subKey: "rechtsAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Zeit_Rollade_hoch_links",
        room: "abstellraumog",
        subKey: "linksAutoUpTime",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Gästezimmer.Zeit_Rollade_hoch",
        room: "gaestezimmer",
        subKey: "fensterAutoUpTime",
        saveId: true,
      },
    ],
  },
  {
    // Auto hoch aktiv
    objectNameInStore: "shutterAutoUp",
    value: [
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_links",
        room: "abstellraumog",
        subKey: "fensterAutoUp",
        saveId: true,
      },
      {
        id: "0_userdata.0.Rolladen.Abstellraum_OG.Auto_hoch_rechts",
        room: "abstellraumog",
        subKey: "fensterAutoUp",
        saveId: true,
      },
    ],
  },
];
