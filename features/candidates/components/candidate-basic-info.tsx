import React from "react";
import { Progress } from "@/components/ui/progress";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { Candidate } from "../data/mock-data";
import StarRating from "@/components/star-rating";
import SkillsBatch from "@/components/skills-batch";

export interface CandidateBasicInfoProps {
  candidate: Candidate;
}

// Card wrapper component
const InfoCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-lg border bg-card p-3 space-y-3">{children}</div>
  );
};

// Section header component
const SectionHeader: React.FC<{
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ children, icon }) => {
  return (
    <h4 className="font-medium flex items-center gap-2">
      {icon}
      {children}
    </h4>
  );
};

// Contact item component
const ContactItem: React.FC<{
  icon: React.ReactNode;
  value: string;
  className?: string;
}> = ({ icon, value, className }) => {
  return (
    <div className={`flex items-center gap-3 text-sm ${className || ""}`}>
      {icon}
      <span className="break-all">{value}</span>
    </div>
  );
};

// Professional detail item component
const DetailItem: React.FC<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
};

const CandidateBasicInfo: React.FC<CandidateBasicInfoProps> = ({
  candidate,
}) => {
  return (
    <React.Fragment>
      {/* AI Match Score */}
      <InfoCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
      </InfoCard>

      {/* Contact Info */}
      <InfoCard>
        <SectionHeader>Contact Information</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ContactItem
            icon={
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            }
            value={candidate.email}
          />
          <ContactItem
            icon={
              <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            }
            value={candidate.phone}
          />
          <ContactItem
            icon={
              <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            }
            value={candidate.location}
            className="col-span-1 sm:col-span-2"
          />
        </div>
      </InfoCard>

      {/* Professional Info */}
      <InfoCard>
        <SectionHeader>Professional Details</SectionHeader>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailItem label="Experience" value={candidate.experience} />
          <DetailItem label="Expected Salary" value={candidate.salary} />
          <DetailItem label="Source" value={candidate.source} />
          <DetailItem
            label="Applied"
            value={new Date(candidate.appliedDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          />
        </div>
      </InfoCard>

      {/* Education */}
      <InfoCard>
        <SectionHeader icon={<GraduationCap className="h-4 w-4" />}>
          Education
        </SectionHeader>
        <p className="text-sm">{candidate.education}</p>
      </InfoCard>

      {/* Skills */}
      <InfoCard>
        <SectionHeader>Skills</SectionHeader>
        <div className="flex flex-wrap gap-2">
          <SkillsBatch skills={candidate.skills} onClick={() => {}} />
        </div>
      </InfoCard>
    </React.Fragment>
  );
};

export default CandidateBasicInfo;
