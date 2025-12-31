import SortableList from "@/components/sortable-list";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch } from "@/store/hooks";
import { JobForm } from "@/interfaces/job";
import { SelectionProcess } from "@/types/selection-process";
import React, { useEffect } from "react";
import HiringProcess from "@/features/jobs/components/hiring-process";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const uid = () => Math.random().toString(36).slice(2, 9);

export interface HiringProcessProps {
  jobForm: JobForm;
  formType: string;
  setFormMerge: ActionCreatorWithPayload<Partial<JobForm>>;
  replaceForm: ActionCreatorWithPayload<JobForm>;
}

const HiringProcesses = ({
  jobForm,
  formType,
  setFormMerge,
  replaceForm,
}: HiringProcessProps) => {
  const dispatch = useAppDispatch();

  const addProcess = () =>
    dispatch(
      setFormMerge({
        selectionProcess: [
          ...jobForm.selectionProcess,
          { id: uid(), name: "", description: "" },
        ],
      })
    );

  const remove = (id: string) =>
    dispatch(
      setFormMerge({
        selectionProcess: jobForm.selectionProcess.filter(
          (process) => process.id !== id
        ),
      })
    );

  const patch = (id: string, changes: Partial<SelectionProcess>) =>
    dispatch(
      setFormMerge({
        selectionProcess: jobForm.selectionProcess.map((process) =>
          process.id === id ? { ...process, ...changes } : process
        ),
      })
    );

  const handleReorder = (next: SelectionProcess[]) =>
    dispatch(setFormMerge({ selectionProcess: next }));

  const duplicate = (id: string) =>
    dispatch(
      setFormMerge({
        selectionProcess: (() => {
          const i = jobForm.selectionProcess.findIndex(
            (process) => process.id === id
          );
          if (i < 0) return jobForm.selectionProcess;
          const copy = { ...jobForm.selectionProcess[i], id: uid() };
          const next = [...jobForm.selectionProcess];
          next.splice(i + 1, 0, copy);
          return next;
        })(),
      })
    );

  useEffect(() => {
    const stored = localStoreGet<JobForm>(formType, jobForm);
    dispatch(replaceForm(stored));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStoreSet<JobForm>(formType, {
      ...jobForm,
      selectionProcess: jobForm.selectionProcess,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobForm.selectionProcess]);

  return (
    <div>
      <ScrollArea className="max-h-[600px] overflow-y-scroll ">
        {jobForm.selectionProcess.length > 0 && (
          <Card className="overflow-hidden">
            <CardContent>
              <SortableList<SelectionProcess>
                items={jobForm.selectionProcess}
                getId={(process) => process.id}
                onReorder={handleReorder}
                className="grid gap-2"
                renderItem={({ item, index, sortable }) => (
                  <HiringProcess
                    key={item.id}
                    process={item}
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
      </ScrollArea>
      <Button className="mt-4" onClick={addProcess} variant="outline">
        <Plus className="mr-2 h-4 w-4" />
        Add Selection process
      </Button>
    </div>
  );
};

export default HiringProcesses;
