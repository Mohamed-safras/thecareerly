import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { DeviceSelectorProps } from "./device-selector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Settings, Speaker, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import InputDevice from "./input-device";

export interface MediaSettingsDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deviceSelectorProps: DeviceSelectorProps;
}

type MenuSection = {
  title?: string;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
  }[];
};

const menuSections: MenuSection[] = [
  {
    items: [
      {
        id: "audio",
        label: "Audio",
        icon: <Speaker className="h-5 w-5" />,
      },
      { id: "video", label: "Video", icon: <Video className="h-5 w-5" /> },
      {
        id: "general",
        label: "General",
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  },
];

const MediaSettingsDailog: React.FC<MediaSettingsDailogProps> = ({
  open,
  onOpenChange,
  deviceSelectorProps,
}) => {
  const [activeItem, setActiveItem] = useState<string>("audio");

  const renderContent = () => {
    switch (activeItem) {
      case "audio":
        return (
          <div className="space-y-3">
            <InputDevice
              lable="Microphone"
              selectedDevice={deviceSelectorProps.selectedMicrophone}
              availableChannel={deviceSelectorProps.microphones}
              setSelectedDevice={deviceSelectorProps.setSelectedMicrophone}
            />

            <InputDevice
              lable="Speaker"
              selectedDevice={deviceSelectorProps.selectedSpeaker}
              availableChannel={deviceSelectorProps.speakers}
              setSelectedDevice={deviceSelectorProps.setSelectedSpeaker}
            />
          </div>
        );
      case "video":
        return (
          <div className="space-y-3">
            <InputDevice
              lable="Camera"
              selectedDevice={deviceSelectorProps.selectedCamera}
              availableChannel={deviceSelectorProps.cameras}
              setSelectedDevice={deviceSelectorProps.setSelectedCamera}
            />
          </div>
        );
      case "general":
        return "general";
      default:
        return (
          <div className="space-y-3">
            <InputDevice
              lable="Microphone"
              selectedDevice={deviceSelectorProps.selectedMicrophone}
              availableChannel={deviceSelectorProps.microphones}
              setSelectedDevice={deviceSelectorProps.setSelectedMicrophone}
            />

            <InputDevice
              lable="Speaker"
              selectedDevice={deviceSelectorProps.selectedSpeaker}
              availableChannel={deviceSelectorProps.speakers}
              setSelectedDevice={deviceSelectorProps.setSelectedSpeaker}
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xs sm:min-w-2xl md:min-w-3xl lg:min-w-4xl xl:min-w-5xl 2xl:min-w-6xl max-w-7xl max-h-[calc(90vh-3rem)] m-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1">
          {/* Sidebar - independently scrollable */}
          <div className="w-60 bg-card/50 border-r border-border flex-shrink-0 h-full overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {menuSections.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground px-3 mb-3">
                      {section.title}
                    </p>
                    <div className="space-y-3 mr-3">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveItem(item.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left",
                            activeItem === item.id
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Content - independently scrollable */}
          <div className="flex-1 min-w-0 bg-background h-full overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-3">{renderContent()}</div>
            </ScrollArea>
          </div>
        </div>

        {/* <DeviceSelector {...deviceSelectorProps} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default MediaSettingsDailog;
