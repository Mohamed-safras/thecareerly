import CircleSpinner from "@/components/circlespinner";
import { InterviewQuestion } from "@/interfaces/job";
import React from "react";

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
        <div className="flex items-center gap-3 bg-status-archived/20 p-3 rounded-lg">
          <CircleSpinner size={20} className="rounded-full" />
          <div className="flex flex-col">
            <span className="font-semibold">
              Generating Interview questions...
            </span>
            <span className="text-sm text-muted-foreground">
              Our AI is crafting personalized questions based on your
              requirements
            </span>
          </div>
        </div>
      ) : (
        <>
          {questions.length > 0 ? (
            <div className="space-y-3 mt-3">
              <h3 className="font-semibold text-sm">Generated Questions:</h3>
              <div className="space-y-3 max-h-[calc(90vh)] overflow-y-auto border rounded-lg p-3">
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
