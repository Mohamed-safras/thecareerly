import { Search } from "lucide-react";

import { SidebarInput } from "@/components/ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative flex items-center">
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-8 pl-7"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
          <Search className="size-4 opacity-50 pointer-events-none select-none" />
        </span>
      </div>
    </form>
  );
}
