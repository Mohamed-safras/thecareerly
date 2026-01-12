import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus } from "lucide-react";

export interface InterviewSchedulerPopupProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InterviewSchedulerPopup: React.FC<InterviewSchedulerPopupProps> = ({
  isDialogOpen,
  setIsDialogOpen,
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Schedule Interview</span>
          <span className="sm:hidden">Schedule</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Interview</DialogTitle>
          <DialogDescription>
            AI-Driven Interviews, Hassle-Free-Hiring
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-3">
          {/* interview */}
          <div className="space-y-3">
            <Label htmlFor="job-position">Job Posistion</Label>
            <Input type="text" placeholder="e.g. Senior Frontend Developer" />
          </div>

          <div className="flex items-center gap-3">
            <div className="space-y-3">
              <Label>Interview Type</Label>
              <Select defaultValue="technical">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="problem-solving">
                    Problem Solving
                  </SelectItem>

                  <SelectItem value="hr">HR Screening</SelectItem>

                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="final">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Duration</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Interview Format</Label>
              <Select defaultValue="video">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-3">
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-3">
              <Label>Time</Label>
              <Input type="time" />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Add your Notes</Label>
            <div className="relative h-20 border-input border rounded-md">
              <Input
                placeholder="Add any notes or agenda items..."
                className="border-none shadow-none"
              />
              <Button
                variant={"outline"}
                className="w-8 h-8 absolute bottom-1 right-2 rounded-full"
              >
                <ArrowUp className="w-4 h-4 " />
              </Button>
            </div>
          </div>

          <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
            Schedule Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewSchedulerPopup;
