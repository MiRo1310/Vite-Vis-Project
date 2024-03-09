interface TableDataItem {
  id: number
  produkt: string
  menge: number
  timestamp: Date
  [key: string]: number | string | Date
}

export const tableData: TableDataItem[] = [
  { id: 1, produkt: 'Apfel', menge: 5, timestamp: new Date() },
  { id: 2, produkt: 'Banane', menge: 3, timestamp: new Date() },
  { id: 3, produkt: 'Orange', menge: 2, timestamp: new Date() },
  { id: 4, produkt: 'Kiwi', menge: 4, timestamp: new Date() },
  { id: 5, produkt: 'Ananas', menge: 1, timestamp: new Date() },
  { id: 6, produkt: 'Erdbeere', menge: 6, timestamp: new Date() },
  { id: 7, produkt: 'Traube', menge: 7, timestamp: new Date() },
  { id: 8, produkt: 'Birne', menge: 3, timestamp: new Date() },
  { id: 9, produkt: 'Kirsche', menge: 2, timestamp: new Date() },
  { id: 10, produkt: 'Pfirsich', menge: 4, timestamp: new Date() },
  { id: 11, produkt: 'Mango', menge: 2, timestamp: new Date() },
  { id: 12, produkt: 'Zitrone', menge: 3, timestamp: new Date() },
  { id: 13, produkt: 'Himbeere', menge: 5, timestamp: new Date() },
  { id: 14, produkt: 'Melone', menge: 1, timestamp: new Date() },
  { id: 15, produkt: 'Heidelbeere', menge: 4, timestamp: new Date() },
  { id: 16, produkt: 'Passionsfrucht', menge: 2, timestamp: new Date() },
  { id: 17, produkt: 'Granatapfel', menge: 3, timestamp: new Date() },
  { id: 18, produkt: 'Pflaume', menge: 6, timestamp: new Date() },
  { id: 19, produkt: 'Aprikose', menge: 3, timestamp: new Date() },
  { id: 20, produkt: 'Feige', menge: 2, timestamp: new Date() }
]
