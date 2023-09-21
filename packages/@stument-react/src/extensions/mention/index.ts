import { userSuggestions } from "./menu";
import { SuggestionOptions } from "@tiptap/suggestion";
import StumentMentionRender from "./render";

type MentionSuggestionType = Omit<SuggestionOptions, "editor">;

export const MentionSuggestion: MentionSuggestionType = {
  items: ({ query }: { query: string }) => {
    const users = userSuggestions();

    const suggestUsers = users
      .filter((user) => {
        return (
          !query || user.label.toLowerCase().startsWith(query.toLowerCase())
        );
      })
      .slice(0, 5);

    return [
      {
        category: "user",
        items: suggestUsers,
      },
    ];
  },
  render: StumentMentionRender,
};
