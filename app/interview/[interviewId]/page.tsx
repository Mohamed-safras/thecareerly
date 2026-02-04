"use client";
import InterviewJoin from "./interview-join-wrapper";
import React, { useEffect, useRef, useState } from "react";
import InterviewRoomWrapper from "./interview-room-wrapper";
import Vapi from "@vapi-ai/web";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

const InterviewJoinPage = () => {
  const vapiRef = useRef<Vapi | null>(null);

  const [join, setJoin] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = [
    "Can you walk me through how you would design a secure user registration and authentication flow for a web application serving construction contractors and lenders?",
    "Describe your approach to implementing encrypted file upload and download functionality. Which encryption methods and cloud storage services would you use, and why?",
    "If a user reports they cannot download a previously uploaded file, what steps would you take to diagnose and resolve the issue?",
    "Tell me about a time you had to meet a tight deadline on a remote project. How did you manage your tasks and communicate with stakeholders?",
    "How do you ensure clear technical documentation and basic user guidance for a platform like this, and can you share an example of what you produced?",
  ];

  // Initialize Vapi once
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    if (!apiKey) {
      console.error("VAPI API key is missing");
      return;
    }

    vapiRef.current = new Vapi(apiKey);

    // Set up event listeners
    vapiRef.current.on("call-start", () => {
      console.log("Call started");
      setLoading(false);
      setJoin(true);
    });

    vapiRef.current.on("call-end", () => {
      console.log("Call ended");
      setJoin(false);
    });

    vapiRef.current.on("error", (error) => {
      console.error("Vapi error:", error);
      setLoading(false);
    });

    vapiRef.current.on("speech-start", () => {
      console.log("Assistant started speaking");
    });

    vapiRef.current.on("speech-end", () => {
      console.log("Assistant stopped speaking");
    });

    // Cleanup on unmount
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const startCall = async () => {
    if (!vapiRef.current) {
      console.error("Vapi not initialized");
      return;
    }

    setLoading(true);

    const questionsList = questions
      .map((question, index) => `${index + 1}. ${question}`)
      .join("\n");

    const assistantOptions: CreateAssistantDTO = {
      name: "AI Recruiter",
      firstMessage:
        "Hi Safras! How are you doing today? Ready for your interview for the Full Stack Developer position?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      // voice: {
      //   provider: "playht",
      //   voiceId: "jennifer",
      // },
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI voice assistant conducting interviews. Your job is to ask candidates the provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Example: "Hi there! Welcome to your Full Stack Developer interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding to the next question.

Keep the questions clear and concise. Below are the questions you need to ask the candidate one by one:

Questions:
${questionsList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about the key components involved in user authentication, such as databases, encryption, and session management."

Provide brief, encouraging feedback after each answer.
Examples:
- "Nice! That's a solid answer."
- "Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging. Use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"

After all questions are asked, conclude the interview with a polite closing remark by summarizing their performance.
Example: "Great job today! You handled some questions well. Keep sharpening your skills!"

End on a positive note: "Thanks for chatting! Hope to see you crushing projects soon!"

Key guidelines:
- Be friendly and supportive throughout the interview.
- Keep responses short and natural, like a real conversation.
- Focus on encouraging the candidate and making them feel comfortable.
- Adapt based on the candidate's responses and engagement level.
- Ensure the interview remains focused on the provided questions and assessing the candidate's skills effectively.`,
          },
        ],
      },
    };

    try {
      await vapiRef.current.start(assistantOptions);
    } catch (error) {
      console.error("Failed to start call:", error);
      setLoading(false);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return (
    <React.Fragment>
      {join ? (
        <InterviewRoomWrapper onEndCall={endCall} />
      ) : (
        <InterviewJoin loading={loading} startCall={startCall} />
      )}
    </React.Fragment>
  );
};

export default InterviewJoinPage;
