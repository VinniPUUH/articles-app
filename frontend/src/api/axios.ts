import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

const getRequest = async (url: string): Promise<any> =>
  await axiosInstance({
    method: "get",
    url: url,
  });

const postRequest = async (url: string, data: any): Promise<any> =>
  await axiosInstance({
    method: "get",
    url: url,
    data: data
  });

export { getRequest, postRequest };
