"use client";
import axios, { AxiosRequestHeaders, isAxiosError } from "axios";
import { getCookie } from "cookies-next";

const folurApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface RequestReturnValue<T> {
  isError: boolean;
  message: string;
  res: T | null;
}

export const noAuthRequest = async <T>(
  url: string,
  method: string, 
  data?: Record<string, unknown>,
  headers?: AxiosRequestHeaders
): Promise<RequestReturnValue<T>> => {
  const appendedHeaders = headers || {};
  try {
    const res = await folurApi({
      method,
      url,
      data,
      timeout: 0,
      headers: {
        ...appendedHeaders,
      },
    });
    return {
      isError: false,
      message: "success",
      res: res.data,
    };
  } catch (err) {
    console.log(err);
    if (isAxiosError(err)) {
      return {
        isError: true,
        message: err.response?.data.error || err.response?.data.message,
        res: null,
      };
    } else {
      return {
        isError: true,
        message: (err as Error).message,
        res: null,
      };
    }
  }
};

export const request = async <T>(
  url: string,
  method: string,
  data?:
    | {
        [key: string]: unknown;
      }
    | FormData,
  headers?: AxiosRequestHeaders
): Promise<RequestReturnValue<T>> => {
  const appendedHeaders = headers || {};
  const payload = {
    method,
    url,
    data,
    timeout: 0,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken") || ""}`,
      ...appendedHeaders,
    },
  };
  try {
    const res = await folurApi(payload);
    return {
      isError: false,
      message: "success",
      res: res.data,
    };
  } catch (err) {
    console.log(err);
    if (isAxiosError(err)) {
      return {
        isError: true,
        message: err.response?.data.error || err.response?.data.message,
        res: null,
      };
    } else {
      return {
        isError: true,
        message: (err as Error).message,
        res: null,
      };
    }
  }
};
