import "./Tiptap.scss";
import { Typography } from "@mui/material";
import * as React from "react";
import {
  BubbleMenu,
  FloatingMenu,
  useEditor,
  EditorContent
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorOptions } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Mention from "@tiptap/extension-mention";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

import MenuBar from "./MenuBar";
import { ColorHighlighter, SmilieReplacer } from "./extensions";

import suggestion from "./mentionSuggestions";

interface Props {
  content: EditorOptions["content"];
  showCounts?:
    | boolean
    | ((characters: number, words: number) => React.ReactNode);
}

const Tiptap = ({ content, showCounts }: Props) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "awesome-wysiwyg-editor"
      }
    },
    onUpdate: ({ editor: _editor }) => {
      console.log(_editor.getJSON());
      localStorage.setItem("_editorContent", JSON.stringify(_editor.getJSON()));
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4, 5]
        }
      }),
      Image,
      TextAlign,
      TextStyle,
      Underline,
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href)
      }),
      CharacterCount,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        }
      }),
      ColorHighlighter,
      SmilieReplacer,
      Mention.configure({
        HTMLAttributes: {
          class: "mention"
        },
        suggestion
      }),
      Youtube.configure({
        inline: false,
        nocookie: true
      })
    ],
    content
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <MenuBar editor={editor} />
      <BubbleMenu
        className="bubble-menu"
        editor={editor}
        tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}>
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}>
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}>
          strike
        </button>
      </BubbleMenu>
      <FloatingMenu
        className="floating-menu"
        tippyOptions={{ duration: 100 }}
        editor={editor}>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }>
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }>
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}>
          Bullet List
        </button>
      </FloatingMenu>
      <EditorContent editor={editor} />
      {showCounts === true ? (
        <Typography variant="subtitle2" color="disabled">
          {editor.storage.characterCount.characters()} characters (
          {editor.storage.characterCount.words()} words)
        </Typography>
      ) : (
        typeof showCounts === "function" &&
        showCounts(
          editor.storage.characterCount.characters(),
          editor.storage.characterCount.words()
        )
      )}
    </>
  );
};

export default Tiptap;
