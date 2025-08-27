import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@radix-ui/react-tabs";
import { Wand2, FileText, ImageIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import type { JobForm } from "@/types/jobform";

type JDPayload = {
  title: string;
  description?: string;
  location?: string;
  salary?: string;
};

type PosterPayload = {
  jobTitle: string;
  brandColorHex?: string;
  companyName?: string;
  vibe?: "professional" | "modern" | "minimal" | "vibrant" | "";
  notes?: string;
};

export interface AIAssistPanelProps {
  form: JobForm;
  setForm: React.Dispatch<React.SetStateAction<JobForm>>;
}

const AIAssistPanel: React.FC<AIAssistPanelProps> = ({ form, setForm }) => {
  const [busyJD, setBusyJD] = useState(false);
  const [busyPoster, setBusyPoster] = useState(false);
  const [jdOut, setJdOut] = useState("");
  const [posterImg, setPosterImg] = useState<string>("");

  // Build compact JD payload from existing form (low token)
  const salaryString =
    form.salaryMin || form.salaryMax || form.currency
      ? [
          form.currency,
          form.salaryMin && ` ${form.salaryMin}`,
          form.salaryMax && `–${form.salaryMax}`,
        ]
          .filter(Boolean)
          .join("")
          .trim()
      : undefined;

  const jdPayload: JDPayload = useMemo(
    () => ({
      title: form.title?.trim() || "",
      description: form.description?.trim() || "",
      location: form.location?.trim() || "",
      salary: salaryString,
    }),
    [form.title, form.description, form.location, salaryString]
  );

  // Poster uses only essential fields to keep tokens tiny
  const [poster, setPoster] = useState<PosterPayload>({
    jobTitle: "",
    brandColorHex: "",
    companyName: "",
    vibe: "professional",
    notes: "white title text; subtle geometric shapes; Apply Now button",
  });

  async function generateJD() {
    if (!jdPayload.title) return;
    setBusyJD(true);
    setJdOut("Generating JD...");
    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: "jd", payload: jdPayload }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setJdOut(`Error: ${data?.error || "Request failed"}`);
        return;
      }
      setJdOut(data.text || "");
    } catch {
      setJdOut("Error: network/server");
    } finally {
      setBusyJD(false);
    }
  }

  async function applyJDToForm() {
    if (!jdOut) return;
    setForm((s) => ({ ...s, description: jdOut }));
  }

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
      {/* Tiny helper prompt (optional, kept short to save tokens) */}
      <div className="space-y-2">
        <Label htmlFor="aiPrompt">Optional hint to AI (≤ 280 chars)</Label>
        <Textarea
          id="aiPrompt"
          rows={3}
          value={form.aiPrompt}
          onChange={(e) =>
            setForm({ ...form, aiPrompt: e.target.value.slice(0, 280) })
          }
          placeholder="Keep short, e.g., 'Tone: concise & ATS-friendly.'"
        />
      </div>

      {/* JD Generator (runs here in AI Assist tab) */}
      <section className="space-y-3 border rounded-xl p-4 bg-white">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <h3 className="font-medium">
            AI-Enhanced Requirement Review & Refinement
          </h3>
        </div>

        {/* Show the source fields (read-only preview) */}
        <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">Title:</span>{" "}
            {jdPayload.title || "—"}
          </div>
          <div>
            <span className="font-medium text-foreground">Location:</span>{" "}
            {jdPayload.location || "—"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={generateJD} disabled={busyJD} className="gap-2">
            <Wand2 className="h-4 w-4" />
            {busyJD ? "Generating…" : "Generate JD"}
          </Button>
          <Button variant="outline" onClick={applyJDToForm} disabled={!jdOut}>
            Use JD in form
          </Button>
        </div>

        {jdOut && (
          <div className="border rounded-xl p-3 bg-neutral-50 whitespace-pre-wrap text-sm">
            {jdOut}
          </div>
        )}
      </section>

      {/* Poster Generator (single image) */}
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
