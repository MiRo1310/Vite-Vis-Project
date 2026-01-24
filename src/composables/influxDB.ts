import { FluxTableMetaData, InfluxDB, QueryApi } from "@influxdata/influxdb-client";
import { onBeforeUnmount, ref } from "vue";
import { logging } from "@/lib/logging.ts";

// Insert this line (Flux) before your aggregateWindow call in `src/lib/influxDB.ts`

// const fluxQuery = `from(bucket: "${bucket}")
//   |> range(start: time(v: ${JSON.stringify(start)}), stop: time(v: ${JSON.stringify(stop)}))
//   |> filter(fn: (r) => r["_measurement"] == "Heizung Schnecke")
//   |> filter(fn: (r) => r["_field"] == "value")

//   |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
//   |> yield(name: "mean")`;

export class InfluxDBClient {
  private readonly url = import.meta.env.VITE_INFLUX_DB_URL as string;
  private readonly token = import.meta.env.VITE_INFLUX_DB_TOKEN as string;
  private readonly org = import.meta.env.VITE_INFLUX_DB_ORG as string;
  private readonly bucket: string = "iobroker";
  private readonly intervallSec: number;
  private readonly measurement: string[];
  private readonly range: number | null = null;
  private readonly intervalLoad: boolean = false;
  private readonly valueType: "boolean" | "number" = "number";
  private intervall: NodeJS.Timeout | null = null;
  private stop = new Date().toISOString();
  private start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  private windowPeriod = "1m";
  private result = ref<Record<string, any>[]>([]);
  private resultTemp: Record<string, any>[] = [];

  private api: QueryApi;

  constructor(
    measurement: string[],
    options?: { type?: "boolean" | "number"; rangeSec?: number; intervall?: number; bucket?: string; url?: string; token?: string; org?: string },
  ) {
    if (options) {
      this.bucket = options.bucket ?? "iobroker";
      this.url = options.url ?? this.url;
      this.token = options.token ?? this.token;
      this.org = options.org ?? this.org;
      this.range = options.rangeSec ?? null;
      this.intervalLoad = this.range !== null;
      this.valueType = options.type ?? "number";
    }

    this.measurement = measurement;
    this.intervallSec = options?.intervall ?? 60;
    this.api = new InfluxDB({ url: this.url, token: this.token }).getQueryApi(this.org);
  }

  private queryRows() {
    if (this.range !== null) {
      this.stop = new Date().toISOString();
      this.start = new Date(Date.now() - this.range * 1000).toISOString();
    }
    this.api.queryRows(this.getQuery(), {
      next: (row: string[], tableMeta: FluxTableMetaData) => {
        const o = tableMeta.toObject(row);
        // console.log(o);
        // console.log(tableMeta.get(row, "_value"));
        this.resultTemp.push({ time: o._time, [o._measurement]: o._value ? 1 : 0 });
      },
      error: (error: Error) => {
        logging({ e: error, title: "QueryRows ERROR", type: "error" });
        this.result.value = [];
      },
      complete: () => {
        logging({ title: "QueryRows SUCCESS" });
        this.result.value = this.resultTemp;
        this.resultTemp = [];
      },
    });
  }

  private getQuery() {
    if (this.valueType === "boolean") {
      return this.fluxQueryBoolean();
    } else {
      return this.fluxQuery();
    }
  }

  private buildMeasurement() {
    return this.measurement.map((m) => `r["_measurement"] == "${m}"`).join(" or ");
  }

  private fluxQuery() {
    return `from(bucket: "${this.bucket}")
  |> range(start: ${this.start}, stop: ${this.stop})
  |> filter(fn: (r) => ${this.buildMeasurement()})
  |> filter(fn: (r) => r["_field"] == "value")
  |> aggregateWindow(every: ${this.windowPeriod}, fn: mean, createEmpty: false)
  |> yield(name: "mean")`;
  }

  private fluxQueryBoolean() {
    return `from(bucket: "${this.bucket}")
  |> range(start: ${this.start}, stop: ${this.stop})
  |> filter(fn: (r) => ${this.buildMeasurement()})
  |> filter(fn: (r) => r["_field"] == "value") `;
  }

  public get() {
    this.queryRows();
    if (this.intervalLoad) {
      this.startInterval();
    }

    onBeforeUnmount(() => {
      if (this.intervall) {
        clearInterval(this.intervall);
        this.intervall = null;
        logging({ title: "InfluxDBClient interval cleared" });
      }
    });
    return this.result;
  }

  private startInterval() {
    this.intervall = setInterval(() => {
      this.queryRows();
    }, this.intervallSec * 1000);
  }
}
