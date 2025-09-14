"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import SortableList from "@/components/sortable-list";
import QuestionRow from "@/features/jobs/components/question-row";
import { Question } from "@/types/question";
import { replaceForm, setForm as setFormMerge } from "@/store/slice/jobs-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import { JobForm } from "@/types/job-form";
import { JOB_FORM } from "@/constents/local-store-values";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function ScreeningQuestions() {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm as JobForm);

  const addQuestion = () =>
    dispatch(
      setFormMerge({
        questions: [
          ...form.questions,
          { id: uid(), prompt: "", type: "short" },
        ],
      })
    );

  const duplicate = (id: string) =>
    dispatch(
      setFormMerge({
        questions: (() => {
          const i = form.questions.findIndex((q) => q.id === id);
          if (i < 0) return form.questions;
          const copy = { ...form.questions[i], id: uid() };
          const next = [...form.questions];
          next.splice(i + 1, 0, copy);
          return next;
        })(),
      })
    );

  const remove = (id: string) =>
    dispatch(
      setFormMerge({
        questions: form.questions.filter((q) => q.id !== id),
      })
    );

  // Patch by id (parent handles id; child only sends changes)
  const patch = (id: string, changes: Partial<Question>) =>
    dispatch(
      setFormMerge({
        questions: form.questions.map((q) =>
          q.id === id ? { ...q, ...changes } : q
        ),
      })
    );

  // dnd reorder -> replace whole array in store
  const handleReorder = (next: Question[]) =>
    dispatch(setFormMerge({ questions: next }));

  useEffect(() => {
    const stored = localStoreGet<JobForm>(JOB_FORM, form);
    dispatch(replaceForm(stored));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStoreSet<JobForm>(JOB_FORM, { ...form, questions: form.questions });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.questions]);
  return (
    <div>
      <ScrollArea className="max-h-[600px] overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {form.questions.length > 0 && (
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-sm">Screening Questions</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="px-4">
                <SortableList<Question>
                  items={form.questions}
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
              </CardContent>
            </Card>
          )}

          <div className="h-fit">
            {form.questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Question Preview</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="grid gap-4 px-4">
                  {form.questions.map((q, i) => (
                    <div key={q.id} className="grid gap-2">
                      <div className="font-medium">
                        {i + 1}.{" "}
                        {q.prompt || (
                          <span className="text-muted-foreground">
                            Untitled question
                          </span>
                        )}
                      </div>
                      {q.type === "short" && (
                        <Input placeholder="Your answer" />
                      )}
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
            )}
          </div>
        </div>
      </ScrollArea>

      <Button className="mt-4" onClick={addQuestion} variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add Question
      </Button>
    </div>
  );
}
