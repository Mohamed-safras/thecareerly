// app/api/teams/route.ts
import { UserProfile } from "@/types/user-profile";
import { NextResponse } from "next/server";

type TeamStatus = "ACTIVE" | "HOLD" | "ARCHIVED" | "NEW";

interface Team {
  id: string;
  teamName: string;
  teamUser: UserProfile[];
  status: TeamStatus;
  createdDate: string;
  lastActivity: string;
  teamColor?: string;
  jobCount: number;
}

function makeFakeTeams(count = 20): Team[] {
  const statuses: TeamStatus[] = ["ACTIVE", "HOLD", "ARCHIVED", "NEW"];
  const names = [
    "North America Talent Acquisition",
    "Middle East & Africa (MEA / MENA)",
    "Asia-Pacific (APAC)",
    "Latin America (LATAM)",
    "Global Shared Teams (Cross-Regional)",
    "R&D Innovations",
  ];

  return Array.from({ length: count }).map((_, i) => {
    const status = statuses[i % statuses.length];
    const teamName = `${names[i % names.length]} ${
      Math.floor(i / names.length) + 1
    }`;
    const users: UserProfile[] = [
      {
        id: "bnqecj3p",
        name: "Josha",
        email: "josha@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        roles: ["super admin"],
        avatar:
          "https://images.unsplash.com/photo-1720501828093-c792c10e3f0b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=573",
      },
      {
        id: "bh1ecj42",
        name: "Elli",
        email: "elli@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=461",
        roles: ["member"],
      },
      {
        id: "3u1reuv4",
        name: "Abe",
        email: "abe45@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "5 minutes ago",
        roles: ["member"],
        avatar:
          "https://images.unsplash.com/photo-1660716040448-6215916d87be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387",
      },
      {
        id: "bh12cj4c",
        name: "John Doe",
        email: "john@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        roles: ["member"],
        avatar:
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      },
      {
        id: "bh22aj4p",
        name: "Ann",
        email: "ann@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        roles: ["team admin", "member", "super admin"],
        avatar:
          "https://images.unsplash.com/photo-1659982821258-f55151f18790?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      },
      {
        id: "bhqec23p",
        name: "Williams",
        email: "williams@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        roles: ["member"],
        avatar:
          "https://images.unsplash.com/photo-1663550910415-9e7fc1f7eb2b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
      },
      {
        id: "bhqecj3p",
        name: "Calcia",
        email: "calcia@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        roles: ["member"],
        avatar:
          "https://plus.unsplash.com/premium_photo-1690397038570-7ec0cacb37f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      },
      {
        id: "ahbecj3p",
        name: "Calcia",
        email: "calcia@asentic.com",
        lastUpdated: "July 20, 2023",
        lastActive: "2 hours ago",
        roles: ["member"],
        avatar:
          "https://plus.unsplash.com/premium_photo-1690397038570-7ec0cacb37f2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
      },
    ];

    return {
      id: `team-${i + 1}`,
      teamName,
      teamUser: users,
      status,
      createdDate: "2024-07-20",
      lastActivity: `${i % 60} minutes ago`,
      teamColor: "#AE70ED",
      jobCount: 9,
    };
  });
}

const ALL_TEAMS = makeFakeTeams(15);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") ?? "1");
  const limit = Number(url.searchParams.get("limit") ?? "8");
  const search = (url.searchParams.get("search") ?? "").toLowerCase();

  const filtered = ALL_TEAMS.filter((team) => {
    if (!search) return true;
    // basic match on team name and user email/name
    const teamMatch =
      team.teamName.toLowerCase().includes(search) ||
      team.status.toLowerCase().includes(search);
    const userMatch = team.teamUser.some(
      (user) =>
        (user.name ?? "").toLowerCase().includes(search) ||
        (user.email ?? "").toLowerCase().includes(search)
    );
    return teamMatch || userMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return NextResponse.json({
    teams: paginated,
    totalPages,
  });
}
