"use client";
import InterviewJoin from "./interview-join-wrapper";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import InterviewRoomWrapper from "./interview-room-wrapper";

const InterviewJoinPage = () => {
  const [joining, setJoining] = useState(false);
  const handleJoinInterview = () => {
    // In real app, this would navigate to the interview room
    toast.success("Joining interview...");
    setTimeout(() => {
      setJoining(true);
      redirect("/interview/jcg-vios-vrk");
    }, 3000);
  };
  return (
    <React.Fragment>
      {joining ? (
        <InterviewRoomWrapper />
      ) : (
        <InterviewJoin
          joining={joining}
          handleJoinInterview={handleJoinInterview}
        />
      )}
    </React.Fragment>
  );
};

export default InterviewJoinPage;
