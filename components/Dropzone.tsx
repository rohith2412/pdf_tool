"use client";

import { Upload } from "lucide-react";
import { useCallback, useRef, useState, type DragEvent } from "react";

type Props = {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
};

export function Dropzone({
  accept = "application/pdf",
  multiple = true,
  onFiles,
  label = "Drop PDF here or click to browse",
  hint = "Your files stay in your browser.",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      onFiles(Array.from(list));
    },
    [onFiles],
  );

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`group relative flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-card border border-dashed text-sm transition-all duration-150 ease-soft ${
        dragging
          ? "border-ink bg-surface-2"
          : "border-line bg-surface hover:border-line-strong hover:bg-surface-2"
      }`}
    >
      <div
        className={`rounded-full border p-2 transition-colors ${
          dragging ? "border-ink bg-white" : "border-line bg-white group-hover:border-ink"
        }`}
      >
        <Upload className="h-4 w-4" strokeWidth={1.5} />
      </div>
      <span className="text-ink">{label}</span>
      <span className="text-xs text-muted">{hint}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
