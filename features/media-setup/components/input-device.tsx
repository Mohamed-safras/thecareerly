import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DeviceInfo } from "@/interfaces/media";

export interface InputDeviceProps {
  lable: string;
  selectedDevice: string;
  availableChannel: DeviceInfo[];
  setSelectedDevice: React.Dispatch<React.SetStateAction<string>>;
}

const InputDevice: React.FC<InputDeviceProps> = ({
  lable,
  selectedDevice,
  availableChannel,
  setSelectedDevice,
}) => (
  <div className="space-y-3">
    <Label className="text-sm font-medium">{lable}</Label>
    <Select value={selectedDevice} onValueChange={setSelectedDevice}>
      <SelectTrigger>
        <SelectValue placeholder="Select microphone" />
      </SelectTrigger>
      <SelectContent>
        {availableChannel.map((availableChannel) => (
          <SelectItem
            key={availableChannel.deviceId}
            value={availableChannel.deviceId}
          >
            {availableChannel.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default InputDevice;
