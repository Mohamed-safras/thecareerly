"use client";

import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setForm as setFormMerge } from "@/features/jobs/jobs-slice";
import { useGeneratePoster } from "@/hooks/use-generate-poster";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Sparkles, ImageIcon } from "lucide-react";

import MarkdownEditor from "@/components/markdowneditor";
import CircleSpinner from "@/components/circlespinner";
import { AnimatedIconButton } from "@/components/animatediconbutton";
import { useUndoRedo } from "@/hooks/use-undo-redo";

const AIAssistPanel: React.FC = () => {
  const form = useAppSelector((s) => s.jobForm);
  const dispatch = useAppDispatch();

  const {
    busyPoster,
    posterImg,
    error,
    sampleImage,
    setSampleImage,
    generatePoster,
    clearPoster,
    clearError,
  } = useGeneratePoster(form);

  const history = useUndoRedo<string>({ capacity: 100 });
  const sampleRef = useRef<HTMLInputElement | null>(null);

  function handleUndo() {
    const prev = history.undo(form.posterNotes ?? "");
    if (prev !== form.posterNotes) {
      dispatch(setFormMerge({ posterNotes: prev }));
    }
  }

  return (
    <section className="space-y-3 border rounded-xl p-4">
      <div className="flex items-center gap-2">
        <ImageIcon className="h-4 w-4" />
        <h3 className="font-medium">Generate Hiring Poster (one image)</h3>
      </div>

      {/* Company + Brand color */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label>Company</Label>
          <Input
            value={form.companyName || ""}
            onChange={(e) =>
              dispatch(setFormMerge({ companyName: e.target.value }))
            }
            placeholder="Your Company"
          />
        </div>

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
      </div>

      {/* Optional sample image */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="sample-image">Sample Image (optional)</Label>
          <div id="sample-image" className="flex items-center gap-3">
            <Input
              ref={sampleRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setSampleImage(f);
                console.log("[AIAssistPanel] set sample image:", f?.name);
              }}
            />
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => sampleRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              {sampleImage ? "Change" : "Upload"}
            </Button>
            {sampleImage && <span className="text-sm">{sampleImage.name}</span>}
          </div>
        </div>
      </div>

      {/* Notes editor */}
      <div className="relative">
        <MarkdownEditor
          value={form.posterNotes || form.description}
          onChange={(v) => {
            if (!busyPoster && (form.posterNotes ?? "") !== v) {
              history.record(form.posterNotes ?? "");
            }
            dispatch(setFormMerge({ posterNotes: v }));
          }}
          classNames="relative bg-transparent"
          placeholder="Write your poster notes here..."
        />

        {busyPoster && (
          <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <CircleSpinner size={56} />
          </div>
        )}

        <div className="absolute bottom-16 right-16">
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

      {/* Error display */}
      {error && (
        <div className="text-red-600">
          {error}{" "}
          <button className="underline" onClick={clearError}>
            dismiss
          </button>
        </div>
      )}

      {/* Generated poster preview */}
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

export default AIAssistPanel;
