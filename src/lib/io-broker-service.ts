import { ref } from "vue";
import { AdminConnection, PROGRESS } from "@iobroker/socket-client";
import { type IobrokerState } from "@/types/types.ts";
import { IOBROKER_HOST, IOBROKER_WS_PORT } from "@/config/config.ts";
import { Logger } from "@/lib/logger.ts";

interface SubscriberValue {
  id: string;
  cb: (state: IobrokerState) => void;
  done?: boolean;
}

export class IoBrokerService {
  private adminConnection: AdminConnection | undefined;
  private queuedIds: SubscriberValue[] = [];
  private adminConnectionEstablished = false;
  private subscribedIds: SubscriberValue[] = [];
  private doneCount = 0;
  private countFlushScheduled = false;
  public readonly subscribedIdsCount = ref(0);
  public readonly subscribedDoneIdsCount = ref(0);
  private readonly isScriptPresent: () => boolean;

  constructor(isScriptPresent = () => !!document.querySelector(".ioBroker")) {
    this.isScriptPresent = isScriptPresent;
  }

  public loadScript(src: string) {
    if (this.isScriptPresent()) {
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.classList.add("ioBroker");
    script.onload = () => this.init();
    document.body.appendChild(script);
  }

  private async init() {
    this.adminConnection = new AdminConnection({
      protocol: "ws:",
      host: IOBROKER_HOST,
      port: IOBROKER_WS_PORT,
      admin5only: false,
      autoSubscribes: [],
      onProgress: (progress) => {
        this.adminConnectionEstablished = progress === PROGRESS.READY;
      },
    });

    await this.adminConnection.startSocket();
    await this.adminConnection.waitForFirstConnection();
    this.subscribeIobrokerStates();
  }
  public get connection() {
    return this.adminConnection;
  }
  public get isAdminConnected() {
    return this.adminConnectionEstablished;
  }

  public async subscribe(subscriberValue: SubscriberValue) {
    if (!this.adminConnection) {
      this.queuedIds.push(subscriberValue);
      return;
    }
    await this.subscribeId(subscriberValue);
  }

  private subscribeIobrokerStates() {
    this.queuedIds.forEach((item) => {
      void this.subscribeId(item);
    });
  }

  private async subscribeId(val: SubscriberValue) {
    const { id, cb } = val;
    if (!this.adminConnection) {
      return;
    }
    this.addSubscriberId(val);
    await this.adminConnection
      .subscribeStateAsync(id, (_id: string, state: IobrokerState) => {
        if (!val.done) {
          val.done = true;
          this.doneCount++;
          this.scheduleCountFlush();
        }
        cb(state);
      })
      .catch((e) => {
        Logger(`Error subscribing to ${id}`, { e });
      });
  }

  private addSubscriberId(subscriberValue: SubscriberValue) {
    this.subscribedIds.push(subscriberValue);
    this.scheduleCountFlush();
  }

  // Hunderte States lösen ihre subscribeStateAsync-Antwort einzeln und zeitversetzt aus.
  // Ohne Bündelung würde jede einzelne Antwort einen eigenen Vue-Re-Render auslösen.
  // requestAnimationFrame begrenzt das Schreiben in die Refs auf max. 1x pro Frame.
  private scheduleCountFlush() {
    if (this.countFlushScheduled) {
      return;
    }
    this.countFlushScheduled = true;
    requestAnimationFrame(() => {
      this.subscribedIdsCount.value = this.subscribedIds.length;
      this.subscribedDoneIdsCount.value = this.doneCount;
      this.countFlushScheduled = false;
    });
  }

  public resetSubscribedIds() {
    this.subscribedIds = [];
    this.doneCount = 0;
    this.subscribedIdsCount.value = 0;
    this.subscribedDoneIdsCount.value = 0;
  }
}

export const ioBrokerService = new IoBrokerService();
