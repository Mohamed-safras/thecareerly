import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiToken = jwt.sign(
    {
      sub: session.user.id,
      authUser: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        roles: session.user.roles,
        organizationId: session.user.organizationId,
        teamId: session.user.teamId,
      },
    },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: "7d" }
  );

  return Response.json({
    token: apiToken,
    apiUrl: req.url,
    expiresIn: "7d",
  });
}
