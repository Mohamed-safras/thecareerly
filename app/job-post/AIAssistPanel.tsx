"use client";

import { useState } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Wand2 } from "lucide-react";

// Redux
import { useAppSelector } from "@/store/hooks";

type PosterPayload = {
  jobTitle: string;
  brandColorHex?: string;
  companyName?: string;
  vibe?: "professional" | "modern" | "minimal" | "vibrant" | "";
  notes?: string;
};

const AIAssistPanel: React.FC = () => {
  const form = useAppSelector((s) => s.jobForm);

  const [busyPoster, setBusyPoster] = useState(false);

  const [posterImg, setPosterImg] = useState<string>("");

  // Poster uses only essential fields to keep tokens tiny
  const [poster, setPoster] = useState<PosterPayload>({
    jobTitle: "",
    brandColorHex: "",
    companyName: "",
    vibe: "professional",
    notes: "white title text; subtle geometric shapes; Apply Now button",
  });

  async function generatePoster() {
    const jobTitle = (poster.jobTitle || form.title || "").trim();
    if (!jobTitle) return;

    setBusyPoster(true);
    setPosterImg("");
    try {
      const payload: PosterPayload = {
        jobTitle,
        brandColorHex: poster.brandColorHex || undefined,
        companyName: poster.companyName || undefined,
        vibe: poster.vibe || "professional",
        notes: poster.notes?.slice(0, 220) || undefined,
      };

      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: "poster", payload }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        alert(data?.error || "Poster generation failed");
        return;
      }
      setPosterImg(data.image);
    } catch {
      alert("Poster generation failed");
    } finally {
      setBusyPoster(false);
    }
  }
  return (
    <TabsContent value="ai" className="mt-4 space-y-6">
      {/* JD Generator */}

      {/* Poster Generator */}
      <section className="space-y-3 border rounded-xl p-4 bg-white">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <h3 className="font-medium">Generate Hiring Poster (one image)</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label>Job Title *</Label>
            <Input
              value={poster.jobTitle || form.title || ""}
              onChange={(e) =>
                setPoster((s) => ({ ...s, jobTitle: e.target.value }))
              }
              placeholder={form.title || "Senior Software Engineer"}
            />
          </div>
          <div className="space-y-1">
            <Label>Brand Color (hex)</Label>
            <Input
              value={poster.brandColorHex || ""}
              onChange={(e) =>
                setPoster((s) => ({ ...s, brandColorHex: e.target.value }))
              }
              placeholder="#00A8E8"
            />
          </div>
          <div className="space-y-1">
            <Label>Company</Label>
            <Input
              value={poster.companyName || ""}
              onChange={(e) =>
                setPoster((s) => ({ ...s, companyName: e.target.value }))
              }
              placeholder="Your Company"
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label>Notes (kept short for cost)</Label>
            <Textarea
              rows={2}
              value={poster.notes || ""}
              onChange={(e) =>
                setPoster((s) => ({ ...s, notes: e.target.value }))
              }
              placeholder="e.g., white title text; subtle shapes; 'Apply Now' button"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={generatePoster}
            disabled={busyPoster}
            className="gap-2"
          >
            <Wand2 className="h-4 w-4" />
            {busyPoster ? "Generating…" : "Generate Poster"}
          </Button>
        </div>

        {posterImg && (
          <div className="space-y-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImg}
              alt="Generated poster"
              className="border rounded-xl w-full h-auto"
            />
            <a
              href={posterImg}
              download={`poster-${Date.now()}.png`}
              className="text-sm underline"
            >
              Download PNG
            </a>
          </div>
        )}
      </section>
    </TabsContent>
  );
};

export default AIAssistPanel;
