import { markMenus, nodeMenus } from "./menu";
import { SuggestionOptions } from "@tiptap/suggestion";
import SlashMenuRender from "./render";

type SlashMenuSuggestionType = Omit<SuggestionOptions, "editor">;

export const SlashMenuSuggestion: SlashMenuSuggestionType = {
  items: () => [...markMenus, ...nodeMenus],
  render: SlashMenuRender,
};
