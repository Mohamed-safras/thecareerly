"use client";

import React from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type MarkDownEditorProps = {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  height?: number;
  children?: React.ReactNode;
  classNames?: string;
};

const MarkdownEditor: React.FC<MarkDownEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your description here...",
  height = 200,
  children,
  classNames,
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className={`rounded-xl border ${classNames}`} data-color-mode="light">
      <MDEditor
        value={value}
        height={height}
        onChange={(v) => onChange(v || "")}
        preview="edit" // only editor mode
        textareaProps={{
          placeholder,
          spellCheck: true,
          "aria-label": "Markdown editor",
        }}
        className="placeholder:text-6xl"
      />

      {children}

      <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
        <span>
          Markdown supported: headings, bold, italic, lists, quotes, code.
        </span>
      </div>
    </div>
  );
};

export default MarkdownEditor;
