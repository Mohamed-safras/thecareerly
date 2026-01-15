import CircleSpinner from "@/components/circlespinner";
import React from "react";

export interface InterviewQuestion {
  question: string;
  type: string;
}

export interface InterviewQuestionsProps {
  generating: boolean;
  questions: InterviewQuestion[];
}

const InterviewQuestions: React.FC<InterviewQuestionsProps> = ({
  generating,
  questions,
}) => {
  return (
    <div>
      {generating ? (
        <>
          <CircleSpinner size={20} className="rounded-full" /> Generating
          questions...
        </>
      ) : (
        <>
          {questions.length > 0 ? (
            <div className="space-y-3 mt-3">
              <h3 className="font-semibold text-sm">Generated Questions:</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto border rounded-lg p-3">
                {questions.map((question, index) => (
                  <div key={index} className="p-2 bg-muted rounded-md">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-sm">
                        {index + 1}.
                      </span>

                      <div className="flex-1">
                        <p className="text-sm">{question.question}</p>

                        <span className="text-xs text-muted-foreground">
                          {question.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            "No questions availble"
          )}
        </>
      )}
    </div>
  );
};

export default InterviewQuestions;
