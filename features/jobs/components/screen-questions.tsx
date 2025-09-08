"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import SortableList from "@/components/sortable-list";
import QuestionRow from "@/features/jobs/components/question-row";
import { Question } from "@/types/question";
import { setForm as setFormMerge } from "@/features/jobs/jobs-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function ScreeningQuestions() {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((s) => s.jobForm);

  const addQuestion = () =>
    dispatch(
      setFormMerge({
        questions: [...questions, { id: uid(), prompt: "", type: "short" }],
      })
    );

  const duplicate = (id: string) =>
    dispatch(
      setFormMerge({
        questions: (() => {
          const i = questions.findIndex((q) => q.id === id);
          if (i < 0) return questions;
          const copy = { ...questions[i], id: uid() };
          const next = [...questions];
          next.splice(i + 1, 0, copy);
          return next;
        })(),
      })
    );

  const remove = (id: string) =>
    dispatch(
      setFormMerge({
        questions: questions.filter((q) => q.id !== id),
      })
    );

  // Patch by id (parent handles id; child only sends changes)
  const patch = (id: string, changes: Partial<Question>) =>
    dispatch(
      setFormMerge({
        questions: questions.map((q) =>
          q.id === id ? { ...q, ...changes } : q
        ),
      })
    );

  // dnd reorder -> replace whole array in store
  const handleReorder = (next: Question[]) =>
    dispatch(setFormMerge({ questions: next }));

  return (
    <div className="mx-auto max-w-5xl">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-xl">Screening Questions</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="max-h-[350px] px-4 overflow-y-scroll">
            <SortableList<Question>
              items={questions}
              getId={(q) => q.id}
              onReorder={handleReorder}
              className="grid gap-2"
              renderItem={({ item, index, sortable }) => (
                <QuestionRow
                  key={item.id}
                  question={item}
                  index={index}
                  isDragging={sortable.isDragging}
                  dragHandle={sortable}
                  onChange={(changes) => patch(item.id, changes)}
                  onDelete={() => remove(item.id)}
                  onDuplicate={() => duplicate(item.id)}
                />
              )}
            />
          </ScrollArea>
          <Button className="mx-4 my-4" onClick={addQuestion} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      {/* Preview */}
      {questions.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {questions.map((q, i) => (
                <div key={q.id} className="grid gap-2">
                  <div className="font-medium">
                    {i + 1}.{" "}
                    {q.prompt || (
                      <span className="text-muted-foreground">
                        Untitled question
                      </span>
                    )}
                  </div>
                  {q.type === "short" && <Input placeholder="Your answer" />}
                  {q.type === "multi" && (
                    <div className="grid gap-2 md:grid-cols-2">
                      <Button variant="outline">Option A</Button>
                      <Button variant="outline">Option B</Button>
                      <Button variant="outline">Option C</Button>
                      <Button variant="outline">Option D</Button>
                    </div>
                  )}
                  {q.type === "yesno" && (
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
      )}
    </div>
  );
}
