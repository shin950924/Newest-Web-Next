// services/feedsService.ts
import apiClient from "../api/apiClient";

export async function getEntries(limit: number, offset: number) {
  const response = await apiClient.get("/feeds", {
    params: { limit, offset },
  });
  return response.data;
}

export async function deleteEntries(entry_id: number) {
  const response = await apiClient.delete("/news/" + entry_id);
  return response.data;
}

export async function deleteComments(comment_id: number) {
  const response = await apiClient.delete("/comments/" + comment_id);
  return response.data;
}

export async function deletePostComments(comment_id: number) {
  const response = await apiClient.delete("/post_comments/" + comment_id);
  return response.data;
}