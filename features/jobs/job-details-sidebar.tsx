import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Job } from "./components/job-posting-card";
import { Pencil, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import MarkdownEditor from "@uiw/react-md-editor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useAppSelector } from "@/store/hooks";

interface JobDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

const JobDetailsSidebar = ({
  isOpen,
  onClose,
  job,
}: JobDetailsSidebarProps) => {
  const router = useRouter();
  const { user } = useAppSelector(({ auth }) => auth);
  console.log(user);

  const handleEdit = () => {
    const queryString = createQueryString({
      id: job.id,
    });
    router.replace(
      `/organization/${user?.organizationId}/team/${user?.teamId}/jobs/edit?${queryString}`,
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex w-[480px] flex-col h-full sm:w-[540px] bg-sidebar">
        <SheetHeader className="border-b pb-4 flex-shrink-0">
          <SheetTitle>{job.title}</SheetTitle>
          {/* <SheetDescription>{job?.description?.slice(0, 50)}</SheetDescription>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{job.workPreference}</Badge>
            <Badge variant="secondary">{job.employmentType}</Badge>
          </div> */}
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-4">
            <div data-theme="dark" className="py-4">
              <MarkdownEditor.Markdown
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
                source={job.description}
              />
            </div>
          </ScrollArea>
        </div>

        <SheetFooter className="flex flex-row items-center justify-between border-t pt-4 flex-shrink-0">
          <Button variant="outline" onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Job Posting?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the job {job.title}? This
                  action cannot be undone and will permanently remove the job
                  posting from your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full justify-end gap-4 mt-4">
                <Button variant="destructive">Delete Job</Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default JobDetailsSidebar;
