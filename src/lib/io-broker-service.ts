import { AdminConnection } from "@iobroker/socket-client";
import { type IobrokerState } from "@/types/types.ts";
import { IOBROKER_HOST, IOBROKER_WS_PORT } from "@/config/config.ts";
import { Logger } from "@/lib/logger.ts";

interface SubscriberValue {
  id: string;
  cb: (state: IobrokerState) => void;
}

export class IoBrokerService {
  private adminConnection: AdminConnection | undefined;
  private queuedIds: SubscriberValue[] = [];

  private subscribedIds: SubscriberValue[] = [];
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
    });

    await this.adminConnection.startSocket();
    await this.adminConnection.waitForFirstConnection();
    this.subscribeIobrokerStates();
  }
  public get connection() {
    return this.adminConnection;
  }
  // public unSubscribeStates(states: IobrokerSubscription[]) {
  //   states.forEach((listObjectOfIds) => {
  //     listObjectOfIds.value.forEach((idObjectEntry) => {
  //       if (this.adminConnection) {
  //         this.adminConnection.unsubscribeState(idObjectEntry.id);
  //       }
  //       this.ioBrokerStore?.removeIdFromSubscribedIds(idObjectEntry.id);
  //     });
  //   });
  // }

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
        cb(state);
      })
      .catch((e) => {
        Logger(`Error subscribing to ${id}`, { e });
      });
  }

  private addSubscriberId(subscriberValue: SubscriberValue) {
    this.subscribedIds.push(subscriberValue);
  }

  public resetSubscribedIds() {
    this.subscribedIds = [];
  }
}

export const ioBrokerService = new IoBrokerService();
