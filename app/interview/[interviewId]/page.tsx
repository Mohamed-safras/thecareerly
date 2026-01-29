"use client";
import InterviewJoin from "./interview-join-wrapper";
import React, { useState } from "react";
import InterviewRoomWrapper from "./interview-room-wrapper";

const InterviewJoinPage = () => {
  const [join, setJoin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleJoinInterview = () => {
    setLoading(true);
    setTimeout(() => {
      setJoin(() => true);
      setLoading(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      {join ? (
        <InterviewRoomWrapper />
      ) : (
        <InterviewJoin
          loading={loading}
          handleJoinInterview={handleJoinInterview}
        />
      )}
    </React.Fragment>
  );
};

export default InterviewJoinPage;
