"use client";
import {
  Star,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Candidate } from "../data/mock-data";

interface CandidateTableRowProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewDetails: (candidate: Candidate) => void;
}

export const CandidateTableRow = ({
  candidate,
  isSelected,
  onSelect,
  onViewDetails,
}: CandidateTableRowProps) => {
  return (
    <TableRow className="group hover:bg-muted/50">
      <TableCell>
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(candidate.id)}
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{candidate.name}</p>
            <p className="text-sm text-muted-foreground">{candidate.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <p className="font-medium">{candidate.role}</p>
          <p className="text-sm text-muted-foreground">
            {candidate.department}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="secondary"
          className={`${candidate.stageColor} text-white border-none`}
        >
          {candidate.stage}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < candidate.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              candidate.matchScore >= 90
                ? "bg-green-100 text-green-700"
                : candidate.matchScore >= 80
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {candidate.matchScore}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {candidate.experience}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(candidate.appliedDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(candidate)}>
                <FileText className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call Candidate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
