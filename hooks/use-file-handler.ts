// hooks/use-file-handler.ts
"use client";

import { useRef, useState } from "react";

export interface UseFileHandlerOptions {
  multiple?: boolean; // default false
  maxFiles?: number; // default 1 when multiple=false, else Infinity
}

export interface UseFileHandler {
  files: File[];
  previews: string[]; // object URLs
  onInputChange: (list: FileList | null) => {
    files: File[];
    previews: string[];
  };
  addFiles: (files: File[]) => { files: File[]; previews: string[] };
  removeAt: (index: number) => void;
  clearAll: () => void;
}

/**
 * Generic file handler:
 * - Manages Files and object URL previews
 * - No Redux, no app specifics
 * - No useEffect; all cleanup handled in-place
 */
export function useFileHandler(
  options?: UseFileHandlerOptions
): UseFileHandler {
  const {
    multiple = false,
    maxFiles = multiple ? Number.POSITIVE_INFINITY : 1,
  } = options ?? {};

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const objectUrlsRef = useRef<string[]>([]);

  function revokeAll() {
    for (const u of objectUrlsRef.current) URL.revokeObjectURL(u);
    objectUrlsRef.current = [];
  }

  function buildState(nextFiles: File[]) {
    // cap by maxFiles
    const capped = nextFiles.slice(0, maxFiles);

    // revoke old then create new previews
    revokeAll();
    const nextUrls = capped.map((f) => {
      const u = URL.createObjectURL(f);
      objectUrlsRef.current.push(u);
      return u;
    });

    setFiles(capped);
    setPreviews(nextUrls);
    return { files: capped, previews: nextUrls };
  }

  function onInputChange(list: FileList | null) {
    const incoming = Array.from(list ?? []);
    return buildState(incoming);
  }

  function addFiles(more: File[]) {
    const incoming = multiple ? [...files, ...more] : more;
    return buildState(incoming);
  }

  function removeAt(index: number) {
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((u, i) => {
      if (i === index) URL.revokeObjectURL(u);
      return i !== index;
    });
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    const removedUrl = previews[index];
    if (removedUrl) {
      const pos = objectUrlsRef.current.indexOf(removedUrl);
      if (pos >= 0) objectUrlsRef.current.splice(pos, 1);
    }
  }

  function clearAll() {
    revokeAll();
    setFiles([]);
    setPreviews([]);
  }

  return { files, previews, onInputChange, addFiles, removeAt, clearAll };
}
