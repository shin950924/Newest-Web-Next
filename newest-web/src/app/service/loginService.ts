// src/services/loginService.t
import apiClient from "../api/apiClient";
import { oneTimeTokenProps, UserApiProps } from "../../../types";

export const postLogin = async (phoneNumber: string):Promise<oneTimeTokenProps> => {
    const response = await apiClient.post('/send_sms_verification', { "phone_number": phoneNumber });
    return response.data;
};

export const postVerifyCode = async (phoneNumber: string, code: string, one_time_token:string): Promise<UserApiProps> => {
  const response = await apiClient.post('/verify_sms_code', { "phone_number": phoneNumber, "verification_code": code, "one_time_token":one_time_token});
  return response.data;
};