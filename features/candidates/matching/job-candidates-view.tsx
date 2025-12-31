import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Users,
  Star,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  MapPin,
  DollarSign,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MatchResult } from "@/types/matching";
import { CandidateCard } from "../components/candidate-card";
import { MatchDetailDialog } from "./match-detail";
import { Job } from "@/features/jobs/components/job-posting-card";

interface JobCandidatesViewProps {
  job: Job;
  matches: MatchResult[];
  onBack: () => void;
}

export function JobCandidatesView({
  job,
  matches,
  onBack,
}: JobCandidatesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRecommendation, setFilterRecommendation] =
    useState<string>("all");
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(
    null
  );
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const filteredMatches = matches
    .filter((m) => {
      if (searchQuery) {
        return m.candidateName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter((m) => {
      if (filterRecommendation !== "all") {
        return m.recommendation === filterRecommendation;
      }
      return true;
    })
    .sort((a, b) => b.overallScore - a.overallScore);

  const strongCount = matches.filter(
    (m) => m.recommendation === "strong"
  ).length;
  const goodCount = matches.filter((m) => m.recommendation === "good").length;
  const considerCount = matches.filter(
    (m) => m.recommendation === "consider"
  ).length;
  const weakCount = matches.filter((m) => m.recommendation === "weak").length;

  const handleViewDetails = (result: MatchResult) => {
    setSelectedResult(result);
    setDetailDialogOpen(true);
  };

  const filterButtons = [
    { value: "all", label: "All", count: matches.length, icon: Users },
    {
      value: "strong",
      label: "Strong",
      count: strongCount,
      icon: Star,
      color: "text-status-active",
    },
    {
      value: "good",
      label: "Good",
      count: goodCount,
      icon: CheckCircle2,
      color: "text-status-new",
    },
    {
      value: "consider",
      label: "Consider",
      count: considerCount,
      icon: AlertTriangle,
      color: "text-status-hold",
    },
    {
      value: "weak",
      label: "Weak",
      count: weakCount,
      icon: XCircle,
      color: "text-status-archived",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-muted/30 to-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4 mb-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-foreground">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5" />
                      {job.salary.min} - {job.salary.max} {job.salary.currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filterButtons.map((btn) => {
              const Icon = btn.icon;
              const isActive = filterRecommendation === btn.value;
              return (
                <motion.button
                  key={btn.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilterRecommendation(btn.value)}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 ${!isActive && btn.color}`} />
                  {btn.label}
                  <span
                    className={`
                    px-1.5 py-0.5 rounded-full text-xs
                    ${
                      isActive ? "bg-primary-foreground/20" : "bg-background/80"
                    }
                  `}
                  >
                    {btn.count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name..."
              className="pl-10 bg-background/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </motion.div>

      {/* Candidate List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredMatches.length > 0 ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* this is already avalible in dashboard candidate card can reuse */}
                {filteredMatches.map((result, index) => (
                  <CandidateCard
                    key={result.id}
                    result={result}
                    onViewDetails={() => handleViewDetails(result)}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Users className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  No candidates found
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  {searchQuery || filterRecommendation !== "all"
                    ? "Try adjusting your search or filters to find more candidates"
                    : "Upload CVs to start matching candidates to this position"}
                </p>
                {(searchQuery || filterRecommendation !== "all") && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterRecommendation("all");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Dialog */}
      <MatchDetailDialog
        result={selectedResult}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  );
}
