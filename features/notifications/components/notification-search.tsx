import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NotificationType } from "@/types/notification";

interface NotificationSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTypes: NotificationType[];
  onTypeToggle: (type: NotificationType) => void;
}

const notificationTypes: { value: NotificationType; label: string }[] = [
  { value: "payment_failed", label: "Payment Failed" },
  { value: "card_expiring", label: "Card Expiring" },
  { value: "spending_limit", label: "Spending Limit" },
  { value: "renewal_reminder", label: "Renewal Reminder" },
  { value: "candidate_update", label: "Candidate Update" },
  { value: "interview_scheduled", label: "Interview Scheduled" },
  { value: "offer_sent", label: "Offer Sent" },
  { value: "approval_required", label: "Approval Required" },
  { value: "team_activity", label: "Team Activity" },
  { value: "system", label: "System" },
];

export const NotificationSearch = ({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
}: NotificationSearchProps) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            All Types
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {notificationTypes.map(({ value, label }) => (
            <DropdownMenuCheckboxItem
              key={value}
              checked={selectedTypes.includes(value)}
              onCheckedChange={() => onTypeToggle(value)}
            >
              {label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
