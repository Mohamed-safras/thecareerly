"use client";

import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/store/slice/jobs-slice";
import { useGeneratePoster } from "@/hooks/use-generate-poster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Sparkles,
  ImageIcon,
  X,
  RotateCcw,
  RotateCw,
  AlertCircle,
} from "lucide-react";
import MarkdownEditor from "@/components/markdowneditor";
import CircleSpinner from "@/components/circlespinner";
import { AnimatedIconButton } from "@/components/animatediconbutton";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFileHandler } from "@/hooks/use-file-handler";
import { AllowedVibesTypeValue, isPosterVibe } from "@/types/poster";
import { ALLOWED_VIBES_TYPES } from "@/constents/basic-info-options";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_FILES = 3;

const AIPosterGenerator: React.FC = () => {
  const form = useAppSelector((s) => s.jobForm);
  const dispatch = useAppDispatch();

  // Generic file handler (up to 3 reference images)
  const {
    files: galleryFiles,
    previews: galleryPreviews,
    onInputChange: onGalleryInputChange,
    removeAt: removeGalleryAt,
    clearAll: clearGalleryAll,
  } = useFileHandler({ multiple: true, maxFiles: MAX_FILES });

  // Pass files to your poster hook
  const {
    busyPoster,
    posterImg,
    error,
    setSampleImages, // from your hook
    generatePoster,
    clearPoster,
    clearError,
  } = useGeneratePoster(form);

  // keep your undo stack
  const history = useUndoRedo<string>({ capacity: 100 });

  // file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // when user picks files, update local previews + your generate hook state
  function handleFilesChosen(list: FileList | null) {
    onGalleryInputChange(list);
    // also reflect into your poster generator state
    // (useFileHandler holds the files internally; pass them out)
    setSampleImages(Array.from(list ?? []).slice(0, MAX_FILES));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeOne(index: number) {
    removeGalleryAt(index);
    // sync to your poster hook
    const next = [...galleryFiles];
    next.splice(index, 1);
    setSampleImages(next);
  }

  function clearAllSamples() {
    clearGalleryAll();
    setSampleImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleUndo() {
    const prev = history.undo(form.posterNotes ?? "");
    if (prev !== form.posterNotes)
      dispatch(setFormMerge({ posterNotes: prev }));
  }

  function handleRedo() {
    const next = history.redo(form.posterNotes ?? "");
    if (next !== form.posterNotes)
      dispatch(setFormMerge({ posterNotes: next }));
  }

  return (
    <section className="space-y-3 border rounded-xl p-4">
      <div className="flex items-center gap-2">
        <ImageIcon className="h-4 w-4" />
        <h3 className="text-base">Generate Hiring Poster</h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label>Brand Color (hex)</Label>
          <Input
            value={form.brandColorHex || ""}
            onChange={(e) =>
              dispatch(setFormMerge({ brandColorHex: e.target.value }))
            }
            placeholder="#00A8E8"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="poster-vibe">Poster vibe</Label>
          <Select
            value={(form.posterVibe as AllowedVibesTypeValue) || undefined}
            onValueChange={(v) => {
              const pv = isPosterVibe(v) ? v : ""; // narrow to PosterVibe
              dispatch(setFormMerge({ posterVibe: pv }));
            }}
          >
            <SelectTrigger id="poster-vibe" className="w-full">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_VIBES_TYPES.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reference images (useFileHandler) */}
      <div className="space-y-1.5">
        <Label htmlFor="sample-images">Reference Images (up to 3)</Label>
        <div className="flex items-center gap-3">
          <Input
            id="sample-images"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={(e) => handleFilesChosen(e.target.files)}
          />
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
            {galleryFiles.length
              ? `${
                  galleryFiles.length > 1
                    ? "Change Reference Images"
                    : "Change Reference Image"
                }`
              : "Add reference images"}
          </Button>
          {galleryFiles.length > 0 && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={clearAllSamples}
              aria-label="Remove all"
              title="Remove all"
            >
              <X className="h-4 w-4 mr-1" />
              {galleryFiles.length > 1 ? "Clear all" : "Clear"}
            </Button>
          )}
        </div>

        {galleryPreviews.length > 0 && (
          <div className="mt-3 columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {galleryPreviews.map((galaryItem, index) => (
              <div
                key={galaryItem}
                className="relative mb-3 border rounded overflow-hidden group"
                style={{ breakInside: "avoid" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={galaryItem}
                  alt={`Sample ${index + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => removeOne(index)}
                  className="absolute top-1 right-1 rounded-full border border-accent-foreground shadow p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer bg-white/85 hover:bg-white"
                  aria-label={`Remove sample ${index + 1}`}
                  title="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-xs text-muted-foreground px-2 py-1 truncate">
                  {galleryFiles[index]?.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        // <div className="text-red-600">
        //   {error}{" "}
        //   <button className="underline" onClick={clearError}>
        //     dismiss
        //   </button>
        // </div>
        <Alert variant="destructive" className="h-fit text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Can’t generate description</AlertTitle>
          <AlertDescription>
            {/* Render all validation messages */}
            {Object.values([error]).map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="relative space-y-1.5">
        <div className="flex items-center justify-between">
          <Label id="description-label" htmlFor="description">
            Poster Notes
          </Label>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Undo"
              onClick={handleUndo}
              disabled={!history.canUndo || busyPoster}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Redo"
              onClick={handleRedo}
              disabled={!history.canRedo || busyPoster}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <MarkdownEditor
            value={form.posterNotes}
            onChange={(v) => {
              // optional undo
              if (!busyPoster && (form.posterNotes ?? "") !== v) {
                history.record(form.posterNotes ?? "");
              }
              dispatch(setFormMerge({ posterNotes: v }));
            }}
            classNames="relative bg-transparent"
            placeholder="Write your poster notes here..."
          />

          {busyPoster && (
            <div className="absolute inset-0 backdrop-blur-xs flex items-center justify-center rounded-lg">
              <CircleSpinner size={56} />
            </div>
          )}

          <div className="absolute bottom-16 right-8">
            <AnimatedIconButton
              label={busyPoster ? "Generating…" : "Generate Poster"}
              icon={<Sparkles className="h-4 w-4" />}
              animation="breath"
              scaleDelta={0.05}
              yDelta={1}
              tiltDeg={2}
              onClick={generatePoster}
              disabled={busyPoster}
              busy={busyPoster}
            />
          </div>
        </div>
      </div>

      {/* Error display */}

      {/* Final single poster */}
      {posterImg && (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={posterImg}
            alt="Generated poster"
            className="border rounded-xl w-full h-auto"
          />
          <div className="flex gap-4">
            <a
              href={posterImg}
              download={`poster-${Date.now()}.png`}
              className="text-sm underline"
            >
              Download PNG
            </a>
            <button className="text-sm underline" onClick={clearPoster}>
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIPosterGenerator;
