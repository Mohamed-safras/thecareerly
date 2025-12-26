import { MiniCalendar } from "@/features/calander/mini-calendar";
import React from "react";

export interface MiniCalanderWrapperProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  //   selectedPositions: string[];
  //   onPositionToggle: (position: string) => void;
  //   positions: string[];
  //   selectedInterviewers: string[];
  //   onInterviewerToggle: (interviewer: string) => void;
  //   interviewers: { name: string; avatar?: string }[];
}

const MiniCalanderWrapper: React.FC<MiniCalanderWrapperProps> = ({
  currentDate,
  onDateChange,
}) => <MiniCalendar currentDate={currentDate} onDateChange={onDateChange} />;

export default MiniCalanderWrapper;
