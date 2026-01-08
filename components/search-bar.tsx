import React from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export interface SearchBarProps {
  searchQuery: string;
  placeHolder?: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  placeHolder = "Search by name, email, role, or skills...",
  setSearchQuery,
}) => {
  return (
    <div className="relative w-full sm:flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeHolder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

export default SearchBar;
