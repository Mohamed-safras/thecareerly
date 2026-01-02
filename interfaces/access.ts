export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "member" | "viewer";
  status: "active" | "pending" | "deactivated";
  joinedAt: string;
  lastActive: string;
  costPerMonth: number;
}

export interface SeatAllocation {
  total: number;
  used: number;
  pending: number;
  costPerSeat: number;
}
