import { Mention, MentionOptions } from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";
import { mergeAttributes } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

import { ReactNodeViewRenderer } from "@tiptap/react";

export type StumentMentionOptions = MentionOptions & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodeView?: any;
};

const StumentMention = Mention.extend<StumentMentionOptions>({
  name: "stument-mention",

  addOptions() {
    return {
      HTMLAttributes: {},
      renderLabel: ({ node }) => {
        return `:(${node.attrs.label}|${node.attrs.category}|${node.attrs.code})`;
      },
      suggestion: {
        char: "@",
        pluginKey: new PluginKey("stument-mention"),
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter;
          const overrideSpace = nodeAfter?.text?.startsWith(" ");

          if (overrideSpace) {
            range.to += 1;
          }

          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              {
                type: this.name,
                attrs: props,
              },
              {
                type: "text",
                text: " ",
              },
            ])
            .run();

          window.getSelection()?.collapseToEnd();
        },

        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const type = state.schema.nodes[this.name];
          const allow = !!$from.parent.type.contentMatch.matchType(type);

          return allow;
        },
      },
    };
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  parseHTML() {
    return [
      {
        tag: `hover-card[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "hover-card",
      mergeAttributes(
        { "data-type": this.name },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ];
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    });
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

          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMention = true;
              tr.insertText(
                this.options.suggestion.char || "",
                pos,
                pos + node.nodeSize
              );

              return false;
            }
          });

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

  addAttributes() {
    return {
      code: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-code"),
        renderHTML: (attributes) => {
          if (!attributes.code) {
            return {};
          }

          return {
            "data-code": attributes.code,
          };
        },
      },
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
      category: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-category"),
        renderHTML: (attributes) => {
          if (!attributes.category) {
            return {};
          }

          return {
            "data-category": attributes.category,
          };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(this.options.nodeView);
  },
});

export default StumentMention;
