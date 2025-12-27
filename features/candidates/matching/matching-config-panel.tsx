import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { defaultMatchingConfig, MatchingConfig } from "@/types/matching";

interface MatchingConfigPanelProps {
  config?: MatchingConfig;
  onConfigChange?: (config: MatchingConfig) => void;
}

export function MatchingConfigPanel({
  config = defaultMatchingConfig,
  onConfigChange,
}: MatchingConfigPanelProps) {
  const [localConfig, setLocalConfig] = useState<MatchingConfig>(config);

  const updateConfig = (updates: Partial<MatchingConfig>) => {
    const newConfig = { ...localConfig, ...updates };

    if (
      "skillsWeight" in updates ||
      "experienceWeight" in updates ||
      "educationWeight" in updates
    ) {
      const total =
        newConfig.skillsWeight +
        newConfig.experienceWeight +
        newConfig.educationWeight;
      if (total !== 100) {
        const key = Object.keys(updates)[0] as keyof MatchingConfig;
        if (key === "skillsWeight") {
          newConfig.experienceWeight = Math.max(
            0,
            100 - newConfig.skillsWeight - newConfig.educationWeight
          );
        } else if (key === "experienceWeight") {
          newConfig.educationWeight = Math.max(
            0,
            100 - newConfig.skillsWeight - newConfig.experienceWeight
          );
        } else if (key === "educationWeight") {
          newConfig.experienceWeight = Math.max(
            0,
            100 - newConfig.skillsWeight - newConfig.educationWeight
          );
        }
      }
    }

    setLocalConfig(newConfig);
  };

  const handleSave = () => {
    onConfigChange?.(localConfig);
    toast.success("Matching configuration saved");
  };

  const handleReset = () => {
    setLocalConfig(defaultMatchingConfig);
    toast.info("Configuration reset to defaults");
  };

  const totalWeight =
    localConfig.skillsWeight +
    localConfig.experienceWeight +
    localConfig.educationWeight;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold text-lg">Matching Configuration</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Weights Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base">Score Weights</Label>
            <span className="text-sm text-muted-foreground">
              Total: {totalWeight}%
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Skills Match</Label>
                <span className="text-sm font-medium">
                  {localConfig.skillsWeight}%
                </span>
              </div>
              <Slider
                value={[localConfig.skillsWeight]}
                onValueChange={([value]) =>
                  updateConfig({ skillsWeight: value })
                }
                max={100}
                step={5}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Experience</Label>
                <span className="text-sm font-medium">
                  {localConfig.experienceWeight}%
                </span>
              </div>
              <Slider
                value={[localConfig.experienceWeight]}
                onValueChange={([value]) =>
                  updateConfig({ experienceWeight: value })
                }
                max={100}
                step={5}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Education</Label>
                <span className="text-sm font-medium">
                  {localConfig.educationWeight}%
                </span>
              </div>
              <Slider
                value={[localConfig.educationWeight]}
                onValueChange={([value]) =>
                  updateConfig({ educationWeight: value })
                }
                max={100}
                step={5}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Thresholds */}
        <div>
          <Label className="text-base mb-4 block">Thresholds</Label>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Minimum Score</Label>
              <span className="text-sm font-medium">
                {localConfig.minimumScore}%
              </span>
            </div>
            <Slider
              value={[localConfig.minimumScore]}
              onValueChange={([value]) => updateConfig({ minimumScore: value })}
              max={100}
              step={5}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Candidates below this score will be flagged
            </p>
          </div>
        </div>

        <Separator />

        {/* Automation */}
        <div>
          <Label className="text-base mb-4 block">Automation</Label>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Auto-reject low matches</p>
              <p className="text-xs text-muted-foreground">
                Automatically reject candidates below minimum score
              </p>
            </div>
            <Switch
              checked={localConfig.autoReject}
              onCheckedChange={(checked) =>
                updateConfig({ autoReject: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Auto-advance high matches</p>
              <p className="text-xs text-muted-foreground">
                Move strong candidates to next stage automatically
              </p>
            </div>
            <Switch
              checked={localConfig.autoAdvance}
              onCheckedChange={(checked) =>
                updateConfig({ autoAdvance: checked })
              }
            />
          </div>

          {localConfig.autoAdvance && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Advance Threshold</Label>
                <span className="text-sm font-medium">
                  {localConfig.advanceThreshold}%
                </span>
              </div>
              <Slider
                value={[localConfig.advanceThreshold]}
                onValueChange={([value]) =>
                  updateConfig({ advanceThreshold: value })
                }
                min={50}
                max={100}
                step={5}
              />
            </div>
          )}
        </div>

        <Button className="w-full" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </Card>
  );
}
