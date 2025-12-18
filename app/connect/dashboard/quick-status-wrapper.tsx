import React from "react";

const QuickStatusWrapper = () => {
  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold mb-4">This Month</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">
            Offer Acceptance Rate
          </span>
          <span className="font-semibold text-status-active">87%</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">
            Interview to Hire
          </span>
          <span className="font-semibold">4.2:1</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">Cost per Hire</span>
          <span className="font-semibold">$2,340</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <span className="text-sm text-muted-foreground">Quality of Hire</span>
          <span className="font-semibold text-status-active">4.6/5</span>
        </div>
      </div>
    </section>
  );
};

export default QuickStatusWrapper;
