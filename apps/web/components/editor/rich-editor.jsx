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
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/services/api";
import { uploadImage } from "@/services/uploads";
const lowlight = createLowlight(all);
const defaultContent =
  "<h2>Untitled issue</h2><p>Start with the strongest promise to your reader.</p>";

export function RichEditor({ initialContent = defaultContent, onChange }) {
  const imageInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);
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
    content: initialContent,
    onUpdate({ editor: nextEditor }) {
      onChange?.({
        html: nextEditor.getHTML(),
        text: nextEditor.getText(),
      });
    },
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
    {
      label: "Heading",
      icon: Heading2,
      run: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    { label: "List", icon: List, run: () => editor?.chain().focus().toggleBulletList().run() },
    { label: "Quote", icon: Quote, run: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: "Code", icon: Code2, run: () => editor?.chain().focus().toggleCodeBlock().run() },
    {
      label: "Table",
      icon: Table2,
      run: () =>
        editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      label: "Image",
      icon: ImagePlus,
      run: () => imageInputRef.current?.click(),
    },
  ];

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadingImage(true);

    try {
      const image = await uploadImage(file);
      editor?.chain().focus().setImage({ src: image.url }).run();
      toast.success("Image inserted");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Image could not be uploaded"));
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  }

  return (
    <div>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
      <div className="flex flex-wrap gap-1 rounded-t-lg border bg-card p-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="ghost"
            size="icon"
            title={action.label}
            aria-label={action.label}
            disabled={action.label === "Image" && uploadingImage}
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
