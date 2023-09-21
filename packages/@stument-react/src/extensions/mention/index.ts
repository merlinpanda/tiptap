import { SuggestionMenus } from "./menu";
import { SuggestionOptions } from "@tiptap/suggestion";
import SlashMenuRender from "./render";

type SlashMenuSuggestionType = Pick<SuggestionOptions, "items" | "render">;

export const SlashMenuSuggestion: SlashMenuSuggestionType = {
  items: () => [...SuggestionMenus],
  render: SlashMenuRender,
};
