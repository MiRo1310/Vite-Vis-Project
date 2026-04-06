import { ErrorCode } from "@/api/gql/graphql.ts";
import { toast } from "@/components/ui/toast";

const toastTitles = {
  units: {
    inUse: "Die Einheit kann nicht gelöscht werden da diese bereits verwendet wird",
    exist: "Die Einheit existiert bereits, und wurde daher nicht noch mal angelegt",
    default: "Die Einheit wurde gelöscht",
  },
  categories: {
    inUse: "Die Kategorie kann nicht gelöscht werden da diese bereits verwendet wird",
    exist: "Die Kategorie existiert bereits, und wurde daher nicht noch mal angelegt",
    default: "Die Kategorie wurde gelöscht",
  },
};

export const errorCodeHandler = (errorCode: ErrorCode, key: keyof typeof toastTitles) => {
  switch (errorCode) {
    case ErrorCode.InUse:
      toast({ title: toastTitles[key].inUse, variant: "destructive" });
      break;
    case ErrorCode.Exist:
      toast({ title: toastTitles[key].exist, variant: "destructive" });
      break;
    default:
      toast({ title: toastTitles[key].default });
  }
};
