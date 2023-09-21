import { Editor as TiptapEditor, EditorContent } from "@tiptap/react";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./EditorTheme";

export type EditorProps = {
  editor: TiptapEditor | null;
};

export const Editor = ({ editor }: EditorProps) => {
  return (
    <>
      <MantineProvider theme={theme}>
        <EditorContent editor={editor} autoFocus />
      </MantineProvider>
    </>
  );
};
