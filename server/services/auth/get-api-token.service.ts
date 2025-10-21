import { getSession } from "next-auth/react";
import axios from "axios";

export async function getApiTokenWithSession() {
  const session = await getSession();
  if (!session || !session.user) throw new Error("No session found");

  const response = await axios.get("/api/auth-service/auth/get-api-token", {
    withCredentials: true,
  });

  console.log("Session:", session);
  console.log("Response:", response.data);

  return response.data.token;
}
