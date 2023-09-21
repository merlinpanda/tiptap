/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IconBold,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconItalic,
  IconList,
  IconPilcrow,
  IconStrikethrough,
  IconTerminal,
  IconUnderline,
  IconSubscript,
  IconSuperscript,
  IconBlockquote,
} from "@tabler/icons-react";
import { Editor } from "@tiptap/react";

interface CommandProps {
  editor: Editor;
  range?: any;
}

const handleCommand = ({ editor, range }: any) => {
  if (range) {
    return editor.chain().focus().deleteRange(range);
  } else {
    return editor.chain().focus();
  }
};

const handleHeadingCommand = (props: CommandProps, level: number) =>
  handleCommand(props).toggleHeading({ level }).run();

const isActive = (editor: any, type: string) => editor.isActive(type);

const isHeadingActive = (editor: any, level: number) =>
  editor.isActive("heading", { level });

export interface ISlashMenuItem {
  title: string;
  description?: string;
  icon: React.FC;
  command: (props: CommandProps) => void;
  isActive: (editor: Editor) => void;
}

export const nodeMenus = [
  {
    title: "Paragraph",
    description: "Just start typing with plain text.",
    icon: IconPilcrow,
    command: (props: CommandProps) =>
      handleCommand(props).toggleNode("paragraph", "paragraph").run(),
    isActive: (editor: any) => isActive(editor, "paragraph"),
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    icon: IconH1,
    command: (props: CommandProps) => handleHeadingCommand(props, 1),
    isActive: (editor: any) => isHeadingActive(editor, 1),
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    icon: IconH2,
    command: (props: CommandProps) => handleHeadingCommand(props, 2),
    isActive: (editor: any) => isHeadingActive(editor, 2),
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    icon: IconH3,
    command: (props: CommandProps) => handleHeadingCommand(props, 3),
    isActive: (editor: any) => isHeadingActive(editor, 3),
  },
  {
    title: "Heading 4",
    description: "Smaller section heading.",
    icon: IconH4,
    command: (props: CommandProps) => handleHeadingCommand(props, 4),
    isActive: (editor: any) => isHeadingActive(editor, 4),
  },
  {
    title: "Heading 5",
    description: "Smallest section heading.",
    icon: IconH5,
    command: (props: CommandProps) => handleHeadingCommand(props, 5),
    isActive: (editor: any) => isHeadingActive(editor, 5),
  },
  {
    title: "Blockquote",
    description: "Create a blockquote.",
    icon: IconBlockquote,
    command: (props: CommandProps) =>
      handleCommand(props).toggleBlockquote().run(),
    isActive: (editor: any) => isActive(editor, "blockquote"),
  },
  {
    title: "Bullet List",
    description: "Create a bullet list.",
    icon: IconList,
    command: (props: CommandProps) =>
      handleCommand(props).toggleBulletList().run(),
    isActive: (editor: any) => isActive(editor, "bulletList"),
  },
  {
    title: "Ordered List",
    description: "Create a ordered list.",
    icon: IconList,
    command: (props: CommandProps) =>
      handleCommand(props).toggleOrderedList().run(),
    isActive: (editor: any) => isActive(editor, "orderedList"),
  },
  {
    title: "CodeBlock",
    description: "Create a code block.",
    icon: IconTerminal,
    command: (props: CommandProps) =>
      handleCommand(props).toggleCodeBlock().run(),
    isActive: (editor: any) => isActive(editor, "codeBlock"),
  },
];

//标记相关的菜单
export const markMenus = [
  {
    title: "Bold",
    description: "Make text bold.",
    icon: IconBold,
    command: (props: CommandProps) => handleCommand(props).toggleBold().run(),
    isActive: (editor: any) => isActive(editor, "bold"),
  },
  {
    title: "Italic",
    description: "Make text italic.",
    icon: IconItalic,
    command: (props: CommandProps) => handleCommand(props).toggleItalic().run(),
    isActive: (editor: any) => isActive(editor, "italic"),
  },
  {
    title: "Strikethrough",
    description: "Make text strikethrough.",
    icon: IconStrikethrough,
    command: (props: CommandProps) => handleCommand(props).toggleStrike().run(),
    isActive: (editor: any) => isActive(editor, "strike"),
  },
  {
    title: "Underline",
    description: "Make text underline.",
    icon: IconUnderline,
    command: (props: CommandProps) =>
      handleCommand(props).toggleUnderline().run(),
    isActive: (editor: any) => isActive(editor, "underline"),
  },
  {
    title: "Subscript",
    description: "Make text subscript.",
    icon: IconSubscript,
    command: (props: CommandProps) =>
      handleCommand(props).toggleSubscript().run(),
    isActive: (editor: any) => isActive(editor, "subscript"),
  },
  {
    title: "Superscript",
    description: "Make text superscript.",
    icon: IconSuperscript,
    command: (props: CommandProps) =>
      handleCommand(props).toggleSuperscript().run(),
    isActive: (editor: any) => isActive(editor, "superscript"),
  },
  {
    title: "Code",
    description: "Make text code.",
    icon: IconCode,
    command: (props: CommandProps) => handleCommand(props).toggleCode().run(),
    isActive: (editor: any) => isActive(editor, "code"),
  },
];
