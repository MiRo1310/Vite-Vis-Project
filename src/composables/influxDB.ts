import { FluxTableMetaData, InfluxDB, QueryApi } from "@influxdata/influxdb-client";
import { onBeforeUnmount, ref } from "vue";
import { logging } from "@/lib/logging.ts";
import { isDefined } from "@vueuse/core";

// Insert this line (Flux) before your aggregateWindow call in `src/lib/influxDB.ts`

// const fluxQuery = `from(bucket: "${bucket}")
//   |> range(start: time(v: ${JSON.stringify(start)}), stop: time(v: ${JSON.stringify(stop)}))
//   |> filter(fn: (r) => r["_measurement"] == "Heizung Schnecke")
//   |> filter(fn: (r) => r["_field"] == "value")

//   |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
//   |> yield(name: "mean")`;

export class InfluxDBClient {
  private readonly url: string;
  private readonly token: string;
  private readonly org: string;
  private readonly bucket: string;
  private readonly intervallSec: number;
  private readonly measurement: string[];
  private readonly range: number | undefined;
  private readonly intervalLoad: boolean;
  private readonly valueType: "boolean" | "number";
  private intervall: ReturnType<typeof setInterval> | null = null;
  private stop = new Date().toISOString();
  private start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  private windowPeriod = "1m";
  private result = ref<Record<string, any>[]>([]);
  private resultTemp: Record<string, any>[] = [];
  private isFetching = false;

  private api: QueryApi;

  constructor(
    measurement: string[],
    options?: { type?: "boolean" | "number"; rangeSec?: number; intervall?: number; bucket?: string; url?: string; token?: string; org?: string },
  ) {
    if (!options) {
      options = {};
    }

    this.url = options.url ?? (import.meta.env.VITE_INFLUX_DB_URL as string);
    this.token = options.token ?? (import.meta.env.VITE_INFLUX_DB_TOKEN as string);
    this.org = options.org ?? (import.meta.env.VITE_INFLUX_DB_ORG as string);
    this.bucket = options.bucket ?? "iobroker";
    this.range = options.rangeSec;
    this.intervalLoad = this.range !== null;
    this.valueType = options.type ?? "number";

    this.measurement = measurement;
    this.intervallSec = options?.intervall ?? 60;
    this.api = new InfluxDB({ url: this.url, token: this.token }).getQueryApi(this.org);
  }

  private queryRows() {
    this.resultTemp = [];
    this.isFetching = true;
    if (isDefined(this.range)) {
      this.stop = new Date().toISOString();
      this.start = new Date(Date.now() - this.range * 1000).toISOString();
    }
    this.api.queryRows(this.getQuery(), {
      next: (row: string[], tableMeta: FluxTableMetaData) => {
        const o = tableMeta.toObject(row);
        const value = this.valueType === "boolean" ? (o._value ? 1 : 0) : o.value;
        this.resultTemp.push({ time: o._time, [o._measurement]: value });
      },
      error: (error: Error) => {
        logging({ e: error, title: "QueryRows ERROR", type: "error" });
        this.resetResult();
      },
      complete: () => {
        logging({ title: "QueryRows SUCCESS" });
        this.result.value = this.resultTemp;
        this.resultTemp = [];
        this.isFetching = false;
      },
    });
  }

  private resetResult() {
    this.result.value = [];
    this.resultTemp = [];
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
      if (this.isFetching) {
        logging({ title: "Previous InfluxDB query still running, skipping this interval" });
        return;
      }
      this.queryRows();
    }, this.intervallSec * 1000);
  }
}
