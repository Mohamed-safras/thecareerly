import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/features/dashboard/candidate-card";
import { ArrowRight, TrendingUp } from "lucide-react";
import React from "react";

const TopCandidatesWrapper = () => {
  const candidatesData = [
    {
      name: "Sarah Chen",
      role: "Senior Frontend Engineer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      stage: "Final Interview",
      stageColor: "badge-new",
      appliedDate: "2 days ago",
      matchScore: 94,
    },
    {
      name: "Marcus Johnson",
      role: "Product Designer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 4,
      stage: "Technical Screen",
      stageColor: "badge-hold",
      appliedDate: "5 days ago",
      matchScore: 87,
    },
    {
      name: "Emily Rodriguez",
      role: "DevOps Engineer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 4,
      stage: "Offer Extended",
      stageColor: "badge-active",
      appliedDate: "1 week ago",
      matchScore: 91,
    },
    {
      name: "David Kim",
      role: "Senior Frontend Engineer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      rating: 3,
      stage: "Phone Screen",
      stageColor: "badge-hold",
      appliedDate: "3 days ago",
      matchScore: 72,
    },
  ];
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Top Candidates</h2>
          <Badge variant="secondary" className="font-normal">
            <TrendingUp className="h-3 w-3 mr-1" />
            AI Ranked
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {candidatesData.map((candidate) => (
          <CandidateCard key={candidate.name} {...candidate} />
        ))}
      </div>
    </section>
  );
};

export default TopCandidatesWrapper;
