export type AnswerType = "short" | "multi" | "yesno";

export type Question = {
  id: string;
  prompt: string;
  type: AnswerType;
};
