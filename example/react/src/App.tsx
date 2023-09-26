import {
  Editor,
  SlashMenuSuggestion,
  MentionSuggestion,
  HoverCardBadge,
} from "@stument/react";
import { useEditor } from "@tiptap/react";
import StumentSlashMenu from "@stument/extension-slashmenu";
import StumentMention from "@stument/extension-mention";
import StarterKit from "@tiptap/starter-kit";
import { MantineProvider, Box } from "@mantine/core";
import { Placeholder } from "@tiptap/extension-placeholder";

export default function App() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      StumentMention.configure({
        nodeView: HoverCardBadge,
        suggestion: MentionSuggestion,
      }),
      Placeholder.configure({
        placeholder: "Enter text or type '/' for commands",
        emptyNodeClass: "empty-node-placeholder",
      }),
      StumentSlashMenu.configure({
        suggestion: SlashMenuSuggestion,
      }),
    ],
    content: `
        <p>Hi everyone! Don’t forget the daily stand up at 8 AM.<hover-card  data-type="stument-mention" data-category="user" data-label="Jennifer Grey"></hover-card> <hover-card data-type="stument-mention" data-category="topic" data-label="Aaaaaa"></hover-card> <hover-card  data-type="stument-mention" data-category="document" data-label="Aaaaaa"></hover-card></p>
        <p><span data-type="stument-mention" data-category="user" data-code="xxx" data-label="Jennifer Grey"></span> Would you mind <hover-card data-type="stument-mention" data-category="toturial" data-label="Aaaaaa"></hover-card> <hover-card  data-type="stument-mention" data-category="document" data-label="Aaaaaa"></hover-card> to share what you’ve been working on lately? We fear not much happened since Dirty Dancing.
        <p> <span data-type="stument-mention" data-category="kcard" data-code="xxx" data-label="Jennifer Grey"></span> Let’s go through your most important points quickly.</p>
        <p>I have a meeting with <span data-type="mention" data-id="Christina Applegate"></span> and don’t want to come late.</p>
        <p>– Thanks, your big boss</p>
      `,
  });
  return (
    <>
      <div className="a">
        <MantineProvider>
          <Box p="sm">
            <Editor editor={editor} />
          </Box>
        </MantineProvider>
      </div>
    </>
  );
}
