import { askCyborgAssistant } from "./api";

export async function queryCyborgIntelligence(query: string, lang: string = "en"): Promise<string> {
  return await askCyborgAssistant(query, lang);
}
