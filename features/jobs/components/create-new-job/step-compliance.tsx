import React, { useState } from "react";
import {
  Shield,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ComplianceCheck, JobFormData } from "@/interfaces/job";
import { defaultComplianceChecks } from "../../data/mock-job-template";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

interface StepComplianceProps {
  jobForm: JobFormData;
  setFormMerge: ActionCreatorWithPayload<Partial<JobFormData>>;
}

const statusIcon = {
  pass: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  fail: <XCircle className="h-4 w-4 text-destructive" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
  pending: (
    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
  ),
};

const statusLabel = {
  pass: "Pass",
  fail: "Fail",
  warning: "Warning",
  pending: "Pending",
};

const StepCompliance: React.FC<StepComplianceProps> = ({
  jobForm,
  setFormMerge,
}) => {
  const [scanning, setScanning] = useState(false);
  const dispatch = useDispatch();

  const runScan = async () => {
    setScanning(true);
    // simulate scanning each check
    const updated: ComplianceCheck[] = [];
    for (const check of jobForm.complianceChecks) {
      await new Promise((r) => setTimeout(r, 300));
      const rand = Math.random();
      const status: ComplianceCheck["status"] =
        rand > 0.3 ? "pass" : rand > 0.1 ? "warning" : "fail";
      updated.push({ ...check, status });
    }
    dispatch(setFormMerge({ complianceChecks: updated }));

    setScanning(false);

    const fails = updated.filter((c) => c.status === "fail").length;
    const warns = updated.filter((c) => c.status === "warning").length;
    if (fails > 0) toast.error(`${fails} compliance issue(s) found`);
    else if (warns > 0) toast.warning(`${warns} warning(s) detected`);
    else toast.success("All compliance checks passed!");
  };

  const resetChecks = () => {
    dispatch(setFormMerge({ complianceChecks: [...defaultComplianceChecks] }));
  };

  const categories = ["bias", "legal", "gdpr", "inclusive"] as const;
  const categoryLabels = {
    bias: "Bias Detection",
    legal: "Legal Compliance",
    gdpr: "GDPR / Privacy",
    inclusive: "Inclusive Language",
  };

  const passCount = jobForm.complianceChecks.filter(
    (c) => c.status === "pass",
  ).length;
  const total = jobForm.complianceChecks.length;

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto border p-3 rounded-lg">
      <div className="flex items-center justify-between">
        {passCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {passCount}/{total} passed
          </Badge>
        </div>
      )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetChecks}
            className="gap-1.5"
            disabled={scanning}
          >
            <RotateCw className="h-3.5 w-3.5" /> Reset
          </Button>
          <Button
            size="sm"
            onClick={runScan}
            disabled={scanning}
            className="gap-1.5"
          >
            {scanning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Shield className="h-3.5 w-3.5" />
            )}
            Run Scan
          </Button>
        </div>

        
      </div>

      

      {categories.map((category) => {
        const checks = jobForm.complianceChecks.filter(
          (check) => check.category === category,
        );
        return (
          <div key={category} className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              {categoryLabels[category]}
            </h4>
            <div className="space-y-3">
              {checks.map((check) => (
                <div
                  key={check.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                    check.status === "fail" &&
                      "border-destructive/50 bg-destructive/5",
                    check.status === "warning" &&
                      "border-yellow-500/50 bg-yellow-500/5",
                    check.status === "pass" &&
                      "border-green-500/30 bg-green-500/5",
                  )}
                >
                  {scanning ? (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  ) : (
                    statusIcon[check.status]
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{check.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {check.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {statusLabel[check.status]}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepCompliance;
