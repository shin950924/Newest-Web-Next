// src/services/userSevice.ts

import apiClient from "../api/apiClient";
import { RegisterUser, Token } from "../../../types";

export const getProfileComments = async (limit: number, offset: number, target_id: string) => {
  const response = await apiClient.get('/get_profile_comments/' + target_id, {
    params: { limit, offset },
  });
  return response.data;
};

export const getProfilePost = async (limit: number, offset: number, target_id: string) => {
  const response = await apiClient.get('/get_profile_posts/' + target_id, {
    params: { limit, offset },
  });
  return response.data;
};

export const getProfileRss = async (limit: number, offset: number, target_id: string) => {
  const response = await apiClient.get('/get_profile_rss/' + target_id, {
    params: { limit, offset },
  });
  return response.data;
};

export const postLike = async ( post_id: number | undefined) => {
  const response = await apiClient.post('/' + post_id + '/like');
  return response.data;
};

export const articleLike = async ( post_id: number | undefined) => {
  const response = await apiClient.post('/article/' + post_id + '/like');
  return response.data;
};

export const getProfile = async ( user_id: string) => {
  const response = await apiClient.get('/users/'+ user_id);
  return response.data;
};

export const getLogin = async (access_token: string) => {
  const response = await apiClient.post('/login', null, {
    headers: {
      token: access_token
    }
  });
  
  return response.data;
};

export const postRegister = async (one_time_token: string, verification_code: string, user: RegisterUser): Promise<Token|null|undefined> => {
  const response = await apiClient.post('/register', {
      user: user, 
      one_time_token: one_time_token,
      verification_code: verification_code
  });

  if(response.data){
    return response.data
  } else if(response.data == null){
    return null
  }else{
    return undefined
  }
};

export const postFollow = async (target_id: string) => {
  const response = await apiClient.post('/follow', {
    target_id: target_id
  });
  
  return response.data;
};

export const deleteUser = async () => {
  const response = await apiClient.delete('/users');
  return response.data;
};