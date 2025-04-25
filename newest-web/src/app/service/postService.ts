import apiClient from "../api/apiClient";
import { useSelector } from "react-redux";
import { FormDataSet, RootState } from "../../../types";

const getToken = (): string => {
  return ""
};

const processImage = async (image: File | string, index: number, formData: FormData) => {
  try {
    if (image instanceof File) {
      formData.append('files', image);
      return;
    }
    
    let filename = "";
    const response = await fetch(image);
    const blob = await response.blob();

    if (image.startsWith('data:') || image.startsWith('blob:')) {
      const extension = blob.type.split('/')[1];
      filename = `image-${index}.${extension}`;
    } else {
      filename = image.split('/').pop() || `image-${index}`;
    }
    formData.append('files', blob, filename);
  } catch (err) {
    console.error("이미지 변환 오류:", err);
  }
};

export const handlePublish = async (formData: FormDataSet) => {
  try {
    const uploadFormData = new FormData();
    uploadFormData.append("title", formData.title);
    uploadFormData.append("description", formData.description ?? "");

    if (formData.images && formData.images.length > 0) {
      await Promise.all(
        formData.images.map((asset, index) => processImage(asset, index, uploadFormData))
      );
    }

    return await uploadPost(uploadFormData);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const handlePublishNews = async (formData: FormDataSet) => {
  try {
    return await uploadNews(formData.title);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

export const uploadPost = async (formData: FormData) => {
  try {
    const token = getToken();
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'token': token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const uploadNews = async (title: string) => {
  try {
    const response = await apiClient.post('/article', { title:title });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const deletePost = async (post_id: number) => {
  try {
    const response = await apiClient.delete(`/post/${post_id}`);
    return response.data;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const postLike = async ( post_id: number | undefined) => {
  const response = await apiClient.post('/' + post_id + '/like');
  return response.data;
};

export const articleLike = async ( post_id: number | undefined) => {
  const response = await apiClient.post('/article/' + post_id + '/like');
  return response.data;
};

export const usePostService = () => {
  const token = useSelector((state: RootState) => state.user.access_token);

  const publishPost = async (formData: FormDataSet) => {
    return handlePublish(formData);
  };

  const publishNews = async (formData: FormDataSet) => {
    return handlePublishNews(formData);
  };

  const removePost = async (post_id: number) => {
    return deletePost(post_id);
  };

  return {
    publishPost,
    publishNews,
    removePost,
    token,
  };
};