// hooks/useUndoRedo.ts
"use client";

import { useRef, useState } from "react";

export type UseUndoRedoOptions<T> = {
  capacity?: number;
  isEqual?: (a: T, b: T) => boolean;
};

export type UseUndoRedoReturn<T> = {
  record: (current: T) => void;
  undo: (current: T) => T;
  redo: (current: T) => T;
  reset: () => void;
  canUndo: boolean;
  canRedo: boolean;
  sizes: { undo: number; redo: number };
};

export function useUndoRedo<T>(
  opts?: UseUndoRedoOptions<T>
): UseUndoRedoReturn<T> {
  const capacity = opts?.capacity ?? 100;
  const isEqual = opts?.isEqual ?? ((a, b) => Object.is(a, b));

  const undoRef = useRef<T[]>([]);
  const redoRef = useRef<T[]>([]);
  const lastRecordedRef = useRef<T | undefined>(undefined);

  // Local version counter to trigger re-render when stacks mutate
  const [, setVersion] = useState(0);
  const bump = () => setVersion((v) => (v + 1) % 1_000_000);

  function record(current: T) {
    if (
      lastRecordedRef.current !== undefined &&
      isEqual(lastRecordedRef.current, current)
    ) {
      return;
    }
    undoRef.current.push(current);
    lastRecordedRef.current = current;
    if (undoRef.current.length > capacity) {
      undoRef.current.splice(0, undoRef.current.length - capacity);
    }
    redoRef.current = [];
    bump();
  }

  function undo(current: T): T {
    if (undoRef.current.length === 0) return current;
    const prev = undoRef.current.pop() as T;
    redoRef.current.push(current);
    if (redoRef.current.length > capacity) {
      redoRef.current.splice(0, redoRef.current.length - capacity);
    }
    bump();
    return prev;
  }

  function redo(current: T): T {
    if (redoRef.current.length === 0) return current;
    const next = redoRef.current.pop() as T;
    undoRef.current.push(current);
    if (undoRef.current.length > capacity) {
      undoRef.current.splice(0, undoRef.current.length - capacity);
    }
    bump();
    return next;
  }

  function reset() {
    undoRef.current = [];
    redoRef.current = [];
    lastRecordedRef.current = undefined;
    bump();
  }

  // No useMemo here — derive from current stacks on each render
  const canUndo = undoRef.current.length > 0;
  const canRedo = redoRef.current.length > 0;

  return {
    record,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    sizes: { undo: undoRef.current.length, redo: redoRef.current.length },
  };
}
