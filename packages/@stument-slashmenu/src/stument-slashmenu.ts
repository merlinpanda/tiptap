/* eslint-disable @typescript-eslint/no-explicit-any */
import { PluginKey } from "@tiptap/pm/state";
import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";
import { Mention } from "@tiptap/extension-mention";

export interface StumentSlashMenu {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
  suggestion: Omit<SuggestionOptions, "editor">;
}

const StumentSlashMenuExtension = Mention.extend<StumentSlashMenu>({
  name: "slash-menu",

  addOptions() {
    return {
      HTMLAttributes: {},
      suggestion: {
        char: "/",
        pluginKey: new PluginKey("slash-menu"),
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },

        allow: ({ state, range }: any) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMention = false;
          const { selection } = state;
          const { empty, anchor } = selection;

          if (!empty) {
            return false;
          }

          state.doc.nodesBetween(
            anchor - 1,
            anchor,
            (node: any, pos: number) => {
              if (node.type.name === this.name) {
                isMention = true;
                tr.insertText(
                  this.options.suggestion.char || "",
                  pos,
                  pos + node.nodeSize
                );

                return false;
              }
            }
          );

          return isMention;
        }),
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default StumentSlashMenuExtension;
