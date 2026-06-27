import { AdminConnection, PROGRESS } from "@iobroker/socket-client";
import { useIobrokerStore } from "@/store/ioBrokerStore.ts";
import { type IobrokerState } from "@/types/types.ts";
import { IOBROKER_HOST, IOBROKER_WS_PORT } from "@/config/config.ts";
import { Logger } from "@/lib/logger.ts";
import { type IoBrokerStore } from "@/store";

interface SubscriberValue {
  id: string;
  cb: (state: IobrokerState) => void;
}

export class IoBrokerService {
  private adminConnection: AdminConnection | undefined;
  private queuedIds: SubscriberValue[] = [];
  private ioBrokerStore: IoBrokerStore | undefined;

  public loadScript(src: string) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => this.init();
    document.body.appendChild(script);
  }

  private async init() {
    this.ioBrokerStore = useIobrokerStore();
    this.adminConnection = new AdminConnection({
      protocol: "ws:",
      host: IOBROKER_HOST,
      port: IOBROKER_WS_PORT,
      admin5only: false,
      autoSubscribes: [],
      onProgress: (progress) => {
        useIobrokerStore().setAdminConnection(progress === PROGRESS.READY);
      },
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

  private async subscribeId({ id, cb }: SubscriberValue) {
    if (!this.adminConnection || !this.ioBrokerStore) {
      return;
    }
    this.ioBrokerStore.addIdToSubscribedIds(id);
    await this.adminConnection
      .subscribeStateAsync(id, (_id: string, state: IobrokerState) => {
        cb(state);
      })
      .catch((e) => {
        Logger(`Error subscribing to ${id}`, { e });
      });
  }
}

export const ioBrokerService = new IoBrokerService();
