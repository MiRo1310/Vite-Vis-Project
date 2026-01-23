import { FluxTableMetaData, InfluxDB } from "@influxdata/influxdb-client";

const url = import.meta.env.VITE_INFLUX_DB_URL;
const token = import.meta.env.VITE_INFLUX_DB_TOKEN;
const org = import.meta.env.VITE_INFLUX_DB_ORG;
const bucket = "iobroker";
const queryApi = new InfluxDB({ url, token }).getQueryApi(org);

const stop = new Date().toISOString();
const start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
const windowPeriod = "1s";
const fluxQuery = `from(bucket: "${bucket}")
  |> range(start: ${start}, stop: ${stop})
  |> filter(fn: (r) => r["_measurement"] == "Phase2")
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
  |> yield(name: "mean")`;
// Insert this line (Flux) before your aggregateWindow call in `src/lib/influxDB.ts`

// const mapTransform =
//   "|> map(fn: (r) => ({ r with _value: if r._value == true then 1.0 else if r._value == false then 0.0 else float(v: r._value) }))";
//
// const fluxQuery = `from(bucket: "${bucket}")
//   |> range(start: time(v: ${JSON.stringify(start)}), stop: time(v: ${JSON.stringify(stop)}))
//   |> filter(fn: (r) => r["_measurement"] == "Heizung Schnecke")
//   |> filter(fn: (r) => r["_field"] == "value")
//   ${mapTransform}
//   |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
//   |> yield(name: "mean")`;

function queryRows() {
  console.log("*** QueryRows ***");
  queryApi.queryRows(fluxQuery, {
    next: (row: string[], tableMeta: FluxTableMetaData) => {
      // the following line creates an object for each row

      const o = tableMeta.toObject(row);
      console.log(o);

      // alternatively, you can get only a specific column value without
      // the need to create an object for every row
      console.log(tableMeta.get(row, "_value"));
    },
    error: (error: Error) => {
      console.error(error);
      console.log("\nQueryRows ERROR");
    },
    complete: () => {
      console.log("\nQueryRows SUCCESS");
    },
  });
}
queryRows();
