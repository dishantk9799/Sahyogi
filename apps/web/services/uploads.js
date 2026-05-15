import { api } from "@/services/api";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/api/uploads/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
}
