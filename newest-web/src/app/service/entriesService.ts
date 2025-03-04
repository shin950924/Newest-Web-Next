import apiClient from "../api/apiClient";

export const getEntries = async (limit: number, offset: number) => {
  const response = await apiClient.get('/feeds', {
    params: { limit, offset },
  });
  return response.data;
};

export const deleteEntries = async (entry_id: number) => {
  const response = await apiClient.delete('/news/' +  entry_id);
  return response.data;
};

export const deleteComments = async (comment_id: number) => {
  const response = await apiClient.delete('/comments/' +  comment_id);
  return response.data;
};

export const deletePostComments = async (comment_id: number) => {
  const response = await apiClient.delete('/post_comments/' +  comment_id);
  return response.data;
};