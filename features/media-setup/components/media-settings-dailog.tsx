import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

export interface MediaSettingsDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MediaSettingsDailog: React.FC<MediaSettingsDailogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl p-0 max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div>dsada</div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaSettingsDailog;
