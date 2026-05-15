import { api } from "@/services/api";

export async function getDashboardOverview() {
  const response = await api.get("/api/dashboard");
  return response.data.data;
}
