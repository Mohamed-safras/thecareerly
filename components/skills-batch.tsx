import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export interface SkillsBatchProps {
  skills: string[];
  children?: React.ReactNode;
  className?: string;
  onClick: (interest: string) => void;
}

const SkillsBatch: React.FC<SkillsBatchProps> = ({
  skills,
  children,
  className,
  onClick,
}) => {
  return (
    <React.Fragment>
      {skills.map((skill) => (
        <Badge
          onClick={() => onClick(skill)}
          key={skill}
          variant="secondary"
          className={cn(`${className}`)}
        >
          {skill}
          {children}
        </Badge>
      ))}
    </React.Fragment>
  );
};

export default SkillsBatch;
