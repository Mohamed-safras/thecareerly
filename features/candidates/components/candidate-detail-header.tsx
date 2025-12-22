import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Linkedin, Github, Globe } from "lucide-react";
import { Candidate } from "../data/mock-data";
import React from "react";

export interface CandidateDetailHeaderProps {
  candidate: Candidate;
}

const CandidateDetailHeader: React.FC<CandidateDetailHeaderProps> = ({
  candidate,
}) => {
  return (
    <div className="p-3 border-b bg-card">
      <SheetHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="text-xl">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-xl">{candidate.name}</SheetTitle>
              <p className="text-sm text-muted-foreground">{candidate.role}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{candidate.department}</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetHeader>
    </div>
  );
};

export default CandidateDetailHeader;
