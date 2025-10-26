import { getSession } from "next-auth/react";
import axios from "axios";
import { AUTH_SERVICE_ENDPOINTS } from "@/constents/api-end-points";

export async function getApiTokenWithSession() {
  const session = await getSession();
  if (!session || !session.user) throw new Error("No session found");

  const response = await axios.get(AUTH_SERVICE_ENDPOINTS.GET_API_TOKEN, {
    withCredentials: true,
  });

  console.log("Session:", session);
  console.log("Response:", response.data);

  return response.data.token;
}
