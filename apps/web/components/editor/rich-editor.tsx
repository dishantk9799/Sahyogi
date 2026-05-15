"use client";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { all, createLowlight } from "lowlight";
import { Bold, Code2, Heading2, ImagePlus, Italic, List, Quote, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const lowlight = createLowlight(all);

export function RichEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Write with Markdown shortcuts. Type / for your own command layer soon.",
      }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "<h2>Untitled issue</h2><p>Start with the strongest promise to your reader.</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[520px] rounded-b-lg border-x border-b bg-background px-6 py-5 text-base leading-8 outline-none prose-sahyogi max-w-none",
      },
    },
  });

  const actions = [
    { label: "Bold", icon: Bold, run: () => editor?.chain().focus().toggleBold().run() },
    { label: "Italic", icon: Italic, run: () => editor?.chain().focus().toggleItalic().run() },
    { label: "Heading", icon: Heading2, run: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "List", icon: List, run: () => editor?.chain().focus().toggleBulletList().run() },
    { label: "Quote", icon: Quote, run: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: "Code", icon: Code2, run: () => editor?.chain().focus().toggleCodeBlock().run() },
    {
      label: "Table",
      icon: Table2,
      run: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      label: "Image",
      icon: ImagePlus,
      run: () => editor?.chain().focus().setImage({ src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643" }).run(),
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-t-lg border bg-card p-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="ghost"
            size="icon"
            title={action.label}
            aria-label={action.label}
            onClick={action.run}
          >
            <action.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
