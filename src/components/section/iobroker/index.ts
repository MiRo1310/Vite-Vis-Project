import { IobrokerLanguages } from "@/types/types.ts";

export interface NewsFeed {
  title: Record<IobrokerLanguages, string>;
  content: Record<IobrokerLanguages, string>;
  id: string;
  class: string;
  "fa-icon": string;
  created: string;
  conditions: string;
}
