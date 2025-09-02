import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BarChart3 } from "lucide-react";

export const analytics = () => {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <BarChart3 className="h-4 w-4" /> Analytics (sample placeholders)
        </CardTitle>
        <CardDescription>
          Impressions & clicks will appear here after posting.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border p-4 text-center">
          <div className="text-2xl font-semibold">—</div>
          <div className="text-xs text-muted-foreground">Impressions</div>
        </div>
        <div className="rounded-xl border p-4 text-center">
          <div className="text-2xl font-semibold">—</div>
          <div className="text-xs text-muted-foreground">Clicks</div>
        </div>
        <div className="rounded-xl border p-4 text-center">
          <div className="text-2xl font-semibold">—</div>
          <div className="text-xs text-muted-foreground">CTR</div>
        </div>
      </CardContent>
    </Card>
  );
};
