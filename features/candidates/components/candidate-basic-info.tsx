import React from "react";
import { Progress } from "@/components/ui/progress";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { Candidate } from "../data/mock-data";
import StarRating from "@/components/star-rating";
import SkillsBatch from "@/components/skills-batch";

export interface CandidateBasicInfoProps {
  candidate: Candidate;
}

const CandidateBasicInfo: React.FC<CandidateBasicInfoProps> = ({
  candidate,
}) => {
  return (
    <React.Fragment>
      <div className="rounded-lg border bg-card p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">AI Match Score & Overall Rating</span>
          <span className="text-2xl font-bold text-primary">
            {candidate.matchScore}%
          </span>
        </div>
        <Progress
          value={candidate.matchScore}
          indicatorClassName="bg-primary"
          className="h-3 bg-muted-foreground"
        />
        <p className="text-sm text-muted-foreground">
          Based on skills, experience, and role requirements
        </p>

        <div className="flex items-center gap-2">
          <StarRating rating={candidate.rating} />
          <span className="text-sm text-muted-foreground ml-2">
            ({candidate.rating}/5)
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-lg border bg-card p-3 space-y-3">
        <h4 className="font-medium">Contact Information</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{candidate.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{candidate.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{candidate.location}</span>
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="rounded-lg border bg-card p-3 space-y-3">
        <h4 className="font-medium">Professional Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Experience</p>
            <p className="text-sm font-medium">{candidate.experience}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Expected Salary</p>
            <p className="text-sm font-medium">{candidate.salary}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Source</p>
            <p className="text-sm font-medium">{candidate.source}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Applied</p>
            <p className="text-sm font-medium">
              {new Date(candidate.appliedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="rounded-lg border bg-card p-3 space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Education
        </h4>
        <p className="text-sm">{candidate.education}</p>
      </div>

      {/* Skills */}
      <div className="rounded-lg border bg-card p-3 space-y-3">
        <h4 className="font-medium">Skills</h4>
        <div className="flex flex-wrap gap-2">
          <SkillsBatch skills={candidate.skills} onClick={() => {}} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CandidateBasicInfo;
