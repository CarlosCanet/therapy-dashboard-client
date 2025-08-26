import axios, { type AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export type APIResponse<T> = {
  status: number;
  statusText: string;
  data: T | null;
  error: unknown;
  loading: boolean;
};


export const useFetch = <T>(method: string, url: string, body?: unknown): APIResponse<T> => {
  const [state, setState] = useState<APIResponse<T>>({
    status: 0,
    statusText: "",
    data: null,
    error: null,
    loading: true,
  });

  const APIMethods: Record<string, () => Promise<AxiosResponse<T>>> = {
    get: () => axios.get<T>(url),
    post: () => axios.post<T>(url, body),
    put: () => axios.put<T>(url, body),
    patch: () => axios.patch<T>(url, body),
    delete: () => axios.delete<T>(url)
  }  

  const getData = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      // const response = await axios.get<T>(url);
      console.log(APIMethods[method])
      const response = await APIMethods[method.toLowerCase()]();
      let transformedData: T[] | T = response.data;
      if (method.toLowerCase() === "get") {
        if (response.data && Array.isArray(response.data)) {
          transformedData = response.data.map(element => {
            return element.date ? { ...element, date: new Date(element.date) } : element;
          });
        }
      }
      console.log("useFetch:", transformedData, "url:", url, "response.data:", response.data);
      setState({
        status: response.status,
        statusText: response.statusText,
        data: transformedData as T,
        error: null,
        loading: false,
      });
    } catch (error) {
      setState((prevState) => ({ ...prevState, error: error, loading: false }));
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  
  return state;
};
