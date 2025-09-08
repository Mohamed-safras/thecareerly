"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";

import SortableList from "@/components/sortable-list";
import QuestionRow from "@/features/jobs/components/question-row";
import { Question } from "@/types/question";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function ScreeningQuestions() {
  const [questions, setQuestions] = React.useState<Question[]>([
    {
      id: uid(),
      prompt: "Can you describe yourself in three words?",
      type: "short",
    },
    {
      id: uid(),
      prompt: "What do you know about our organisation?",
      type: "multi",
    },
    {
      id: uid(),
      prompt: "Where do you see yourself in three years?",
      type: "short",
    },
  ]);

  const addQuestion = () =>
    setQuestions((curr) => [...curr, { id: uid(), prompt: "", type: "short" }]);
  const duplicate = (id: string) =>
    setQuestions((curr) => {
      const i = curr.findIndex((question) => question.id === id);
      if (i < 0) return curr;
      const copy = { ...curr[i], id: uid() };
      const next = [...curr];
      next.splice(i + 1, 0, copy);
      return next;
    });
  const remove = (id: string) =>
    setQuestions((curr) => curr.filter((question) => question.id !== id));

  return (
    <div className="mx-auto max-w-5xl">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl">Screening Questions</CardTitle>
          <Button onClick={addQuestion}>
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[520px] p-4">
            <SortableList<Question>
              items={questions}
              getId={(question) => question.id}
              onReorder={(next) => setQuestions(next)}
              className="grid gap-3"
              renderItem={({ item, index, sortable }) => (
                <QuestionRow
                  key={item.id}
                  question={item}
                  index={index}
                  isDragging={sortable.isDragging}
                  dragHandle={sortable}
                  onChange={(patch) =>
                    setQuestions((curr) =>
                      curr.map((question) =>
                        question.id === item.id
                          ? { ...question, ...patch }
                          : question
                      )
                    )
                  }
                  onDelete={() => remove(item.id)}
                  onDuplicate={() => duplicate(item.id)}
                />
              )}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Simple live preview below (kept separate from editor) */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {questions.map((question, i) => (
              <div key={question.id} className="grid gap-2">
                <div className="font-medium">
                  {i + 1}.{" "}
                  {question.prompt || (
                    <span className="text-muted-foreground">
                      Untitled question
                    </span>
                  )}
                </div>
                {question.type === "short" && (
                  <Input placeholder="Your answer" />
                )}
                {question.type === "multi" && (
                  <div className="grid gap-2 md:grid-cols-2">
                    <Button variant="outline">Option A</Button>
                    <Button variant="outline">Option B</Button>
                  </div>
                )}
                {question.type === "yesno" && (
                  <div className="flex gap-2">
                    <Button variant="outline">Yes</Button>
                    <Button variant="outline">No</Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
