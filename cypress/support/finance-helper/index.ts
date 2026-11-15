import { addressHelper } from "./address.ts";
import { description } from "./description.ts";
import { listingHelper } from "./listing.ts";
import { dataSel } from "../utils.ts";

const confirmDialog = (alias: string) => {
  return {
    close: () => cy.get(alias).find(dataSel("btn-close")).click(),
    action: () => cy.get(alias).find(dataSel("btn-action")).click(),
  };
};

export const finance = { address: addressHelper, description: description, listing: listingHelper, confirmDialog };
