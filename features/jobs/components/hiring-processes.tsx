import SortableList from "@/components/sortable-list";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { JobForm } from "@/types/job-form";
import { SelectionProcess } from "@/types/selection-process";
import { replaceForm, setForm as setFormMerge } from "@/store/slice/jobs-slice";
import React, { useEffect } from "react";
import HiringProcess from "@/features/jobs/components/hiring-process";
import { localStoreGet, localStoreSet } from "@/lib/common/localstore";
import { JOB_FORM } from "@/constents/local-store-values";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const uid = () => Math.random().toString(36).slice(2, 9);

const HiringProcesses = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector((s) => s.jobForm as JobForm);

  const addProcess = () =>
    dispatch(
      setFormMerge({
        selectionProcess: [
          ...form.selectionProcess,
          { id: uid(), name: "", description: "" },
        ],
      })
    );

  const remove = (id: string) =>
    dispatch(
      setFormMerge({
        selectionProcess: form.selectionProcess.filter(
          (process) => process.id !== id
        ),
      })
    );

  const patch = (id: string, changes: Partial<SelectionProcess>) =>
    dispatch(
      setFormMerge({
        selectionProcess: form.selectionProcess.map((process) =>
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
          const i = form.selectionProcess.findIndex(
            (process) => process.id === id
          );
          if (i < 0) return form.selectionProcess;
          const copy = { ...form.selectionProcess[i], id: uid() };
          const next = [...form.selectionProcess];
          next.splice(i + 1, 0, copy);
          return next;
        })(),
      })
    );

  useEffect(() => {
    const stored = localStoreGet<JobForm>(JOB_FORM, form);
    dispatch(replaceForm(stored));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStoreSet<JobForm>(JOB_FORM, {
      ...form,
      selectionProcess: form.selectionProcess,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.selectionProcess]);

  return (
    <div>
      <ScrollArea className="max-h-[600px] overflow-y-scroll ">
        {form.selectionProcess.length > 0 && (
          <Card className="overflow-hidden">
            <CardContent>
              <SortableList<SelectionProcess>
                items={form.selectionProcess}
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
