import { Mention } from "@tiptap/extension-mention";
import { PluginKey } from "@tiptap/pm/state";
import {mergeAttributes} from '@tiptap/core';
import  Suggestion from '@tiptap/suggestion';
import { ReactRenderer, ReactNodeViewRenderer } from '@tiptap/react';
import tippy from 'tippy.js'
import { HoverCardBadge } from "./HoverCard";

import MentionList from "./MentionList";

const ZDMention = Mention.extend({
  name: "zd-mention",

  addOptions() {
    return {
      HTMLAttributes: {},
      renderLabel: ({ node }) => {
          return `:(${node.attrs.label}|${node.attrs.category}|${node.attrs.code})`;
      },
      suggestion: {
        char: "@",
        pluginKey: new PluginKey("zd-mention"),
        command: ({ editor, range, props }) => {
          // increase range.to by one when the next node is of type "text"
          // and starts with a space character
          const nodeAfter = editor.view.state.selection.$to.nodeAfter
          const overrideSpace = nodeAfter?.text?.startsWith(' ')

          if (overrideSpace) {
            range.to += 1
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
                type: 'text',
                text: ' ',
              },
            ])
            .run()

          window.getSelection()?.collapseToEnd()
        },

        items: ({ query }) => {
          return [
            'Lea Thompson',
            'Cyndi Lauper',
            'Tom Cruise',
            'Madonna',
            'Jerry Hall',
            'Joan Collins',
            'Winona Ryder',
            'Christina Applegate',
            'Alyssa Milano',
            'Molly Ringwald',
            'Ally Sheedy',
            'Debbie Harry',
            'Olivia Newton-John',
            'Elton John',
            'Michael J. Fox',
            'Axl Rose',
            'Emilio Estevez',
            'Ralph Macchio',
            'Rob Lowe',
            'Jennifer Grey',
            'Mickey Rourke',
            'John Cusack',
            'Matthew Broderick',
            'Justine Bateman',
            'Lisa Bonet',
          ]
            .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
            .slice(0, 5)
        },

        render: () => {
          let component
          let popup

          return {
            onStart: props => {
              component = new ReactRenderer(MentionList, {
                props,
                editor: props.editor,
              })

              if (!props.clientRect) {
                return
              }

              // @ts-ignore
              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              })
            },

            onUpdate(props) {
              component.updateProps(props)

              if (!props.clientRect) {
                return
              }

              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              })
            },

            onKeyDown(props) {
              if (props.event.key === 'Escape') {
                popup[0].hide()

                return true
              }

              return component.ref?.onKeyDown(props)
            },

            onExit() {
              popup[0].destroy()
              component.destroy()
            },
          }
        },
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from)
          const type = state.schema.nodes[this.name]
          const allow = !!$from.parent.type.contentMatch.matchType(type)

          return allow
        },
      }
    }
  },

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  parseHTML() {
    return [
      {
        tag: `hover-card[data-type="${this.name}"]`,
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'hover-card',
      mergeAttributes({ 'data-type': this.name }, this.options.HTMLAttributes, HTMLAttributes),
      this.options.renderLabel({
        options: this.options,
        node,
      }),
    ]
  },

  renderText({ node }) {
    return this.options.renderLabel({
      options: this.options,
      node,
    })
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => this.editor.commands.command(({ tr, state }) => {
        let isMention = false
        const { selection } = state
        const { empty, anchor } = selection

        if (!empty) {
          return false
        }

        state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
          if (node.type.name === this.name) {
            isMention = true
            tr.insertText(this.options.suggestion.char || '', pos, pos + node.nodeSize)

            return false
          }
        })

        return isMention
      }),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },

  addAttributes() {
    return {
      code: {
        default: null,
        parseHTML: element => element.getAttribute('data-code'),
        renderHTML: attributes => {
          if (!attributes.code) {
            return {}
          }

          return {
            'data-code': attributes.code,
          }
        },
      },
      label: {
        default: null,
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => {
          if (!attributes.label) {
            return {}
          }

          return {
            'data-label': attributes.label,
          }
        },
      },
      category: {
        default: null,
        parseHTML: element => element.getAttribute('data-category'),
        renderHTML: attributes => {
          if (!attributes.category) {
            return {}
          }

          return {
            'data-category': attributes.category,
          }
        },
      },
    }
  },

  addNodeView: () => {
      return ReactNodeViewRenderer(HoverCardBadge);
  },
});

export default ZDMention;