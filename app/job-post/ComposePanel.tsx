import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { JobForm } from "@/types/jobform";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { TabsContent } from "@radix-ui/react-tabs";
import { ImageIcon, Upload, XCircle } from "lucide-react";
import React, { useRef } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

export interface ComposeProps {
  form: JobForm;
  logoPreview: string | null;
  setForm: React.Dispatch<React.SetStateAction<JobForm>>;
  setLogoPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const ComposePanel: React.FC<ComposeProps> = ({
  form,
  logoPreview,
  setForm,
  setLogoPreview,
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleLogoChange(file?: File | null) {
    const f = file ?? null;
    setForm((prev) => ({ ...prev, logoFile: f }));
    if (f) {
      const url = URL.createObjectURL(f);
      console.log(url);
      setLogoPreview(url);
    } else {
      setLogoPreview(null);
    }
  }

  const title2 = {
    name: "title2",
    keyCommand: "title2",
    button: { "aria-label": "Add title text" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z"
        />
      </svg>
    ),
    execute: ({ state, view }) => {
      if (!state || !view) return;
      const lineInfo = view.state.doc.lineAt(view.state.selection.main.from);
      let mark = "#";
      const matchMark = lineInfo.text.match(/^#+/);
      if (matchMark && matchMark[0]) {
        const txt = matchMark[0];
        if (txt.length < 6) {
          mark = txt + "#";
        }
      }
      if (mark.length > 6) {
        mark = "#";
      }
      const title = lineInfo.text.replace(/^#+/, "");
      view.dispatch({
        changes: {
          from: lineInfo.from,
          to: lineInfo.to,
          insert: `${mark} ${title}`,
        },
        // selection: EditorSelection.range(lineInfo.from + mark.length, lineInfo.to),
        selection: { anchor: lineInfo.from + mark.length },
      });
    },
  };

  return (
    <TabsContent value="compose" className="mt-4 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g., Senior Full‑Stack Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="City, Country (or Remote)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the role, impact, and responsibilities"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <MarkdownEditor
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
          toolbars={["bold", title2]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="salaryMin">Salary Range (optional)</Label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              id="salaryMin"
              type="number"
              inputMode="numeric"
              placeholder="Min"
              value={form.salaryMin}
              onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
            />
            <Input
              id="salaryMax"
              type="number"
              inputMode="numeric"
              placeholder="Max"
              value={form.salaryMax}
              onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
            />
            <Input
              id="currency"
              placeholder="Currency"
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Include Multimedia</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={form.includeMultimedia}
              onCheckedChange={(v) =>
                setForm({ ...form, includeMultimedia: v })
              }
            />
            <span className="text-sm text-muted-foreground">
              Logos, banners, videos
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Company Logo</Label>
          <div className="flex items-center gap-3">
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleLogoChange(e.target.files?.[0])}
            />
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-4 w-4" /> Upload
            </Button>
            {logoPreview ? (
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={logoPreview}
                  alt="logo"
                  className="rounded-full"
                />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground">
                <ImageIcon className="h-5 w-5" />
              </div>
            )}
            {logoPreview && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleLogoChange(null)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-2" />
    </TabsContent>
  );
};

export default ComposePanel;
