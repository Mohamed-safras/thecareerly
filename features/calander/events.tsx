import React from "react";

export interface EventsProps {
  children?: React.ReactNode;
}

const Events: React.FC<EventsProps> = ({ children }) => {
  return (
    <div className="w-full overflow-y-scroll border-border">
      <div className="p-3 border-b sticky top-0 z-10 bg-background">
        <h3 className="text-sm font-semibold text-foreground">My Events</h3>
      </div>
      {children}
    </div>
  );
};

export default Events;
