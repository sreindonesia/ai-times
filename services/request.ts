"use client";
import axios, { AxiosRequestHeaders, isAxiosError } from "axios";
import { getCookie } from "cookies-next";

const aiTimesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_API_URL,
});

export interface RequestReturnValue<T> {
  isError: boolean;
  message: string;
  res: T | null;
  statusCode: number;
}

export const noAuthRequest = async <T>(
  url: string,
  method: string,
  data?: Record<string, unknown>,
  headers?: AxiosRequestHeaders
): Promise<RequestReturnValue<T>> => {
  const appendedHeaders = headers || {};
  try {
    const res = await aiTimesApi({
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
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);
    if (isAxiosError(err)) {
      return {
        isError: true,
        message: err.response?.data.error || err.response?.data.message,
        res: null,
        statusCode: err.response?.status || 500,
      };
    } else {
      return {
        isError: true,
        message: (err as Error).message,
        res: null,
        statusCode: 500,
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
      Authorization: `Bearer ${getCookie("ai_times_token") || ""}`,
      ...appendedHeaders,
    },
  };
  try {
    const res = await aiTimesApi(payload);
    return {
      isError: false,
      message: "success",
      res: res.data,
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);
    if (isAxiosError(err)) {
      return {
        isError: true,
        message: err.response?.data.error || err.response?.data.message,
        res: null,
        statusCode: err.response?.status || 500,
      };
    } else {
      return {
        isError: true,
        message: (err as Error).message,
        res: null,
        statusCode: 500,
      };
    }
  }
};
