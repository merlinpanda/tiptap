import { Extension } from "@tiptap/core";
import { NodeSelection, Plugin } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

const SideMenuPlugin = new Plugin({
  view: (view) => {
    const dragHandleElement = document.createElement("div");
    dragHandleElement.draggable = true;
    dragHandleElement.dataset.dragHandle = "";
    dragHandleElement.classList.add("drag-handle");

    view?.dom?.parentElement?.appendChild(dragHandleElement);

    return {
      destroy: () => {
        dragHandleElement?.remove?.();
      },
    };
  },
});

function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem: Element) =>
        elem.parentElement?.matches?.(".ProseMirror") ||
        elem.matches(
          [
            "li",
            "p:not(:first-child)",
            "pre",
            "blockquote",
            "h1, h2, h3, h4, h5, h6",
          ].join(", ")
        )
    );
}

function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect();

  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1,
  })?.inside;
}

interface ISideMenuProps {
  // side menu box width
  boxWidth: number;
  shouldShow?: boolean;
}

export class SideMenu {
  private element: HTMLDivElement | null;
  constructor(private props: ISideMenuProps) {
    const element = document.createElement("div");
    element.dataset.sidemenu = "";
    element.classList.add("stument-sidemenu");
    this.element = element;
  }

  private buildPlusAction() {
    const element = document.createElement("div");
    element.classList.add("stument-sidemenu-plus");

    this.element?.appendChild(element);
  }

  plugin() {
    return new Plugin({
      view: (view) => {
        this.buildPlusAction();
        this.element && view?.dom?.parentElement?.appendChild(this.element);

        return {
          destroy: () => {
            this.element?.remove?.();
            this.element = null;
          },
        };
      },
      props: {
        handleDOMEvents: {
          mousemove: (view, event) => {
            if (!view.editable && !this.props?.shouldShow) {
              return;
            }

            const node = nodeDOMAtCoords({
              x: event.clientX + 50 + this.props.boxWidth,
              y: event.clientY,
            });

            if (!(node instanceof Element)) return;

            const nodePos = nodePosAtDOM(node, view);
            if (nodePos == null || nodePos < 0) return;

            view.dispatch(
              view.state.tr.setSelection(
                NodeSelection.create(view.state.doc, nodePos)
              )
            );
          },
        },
      },
    });
  }
}

interface StumentSidePluginItem {
  name: string;
  width: number;
}

export interface IStumentSideMenuOptions {
  sidemenus: () => StumentSidePluginItem[];
  shouldShow?: boolean;
}

const StumentSideMenu = Extension.create({
  name: "stumentSideMenu",

  addOptions() {
    return {
      sidemenus: () => {
        return [];
      },
      shouldShow: false,
    };
  },

  addProseMirrorPlugins() {
    return [SideMenuPlugin];
  },
});

export default StumentSideMenu;
