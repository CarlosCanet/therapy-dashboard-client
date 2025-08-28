import axios from "axios";
import { useEffect, useState } from "react";

export type APIResponse<T> = {
  status: number;
  statusText: string;
  data: T | T[] | null;
  error: unknown;
  loading: boolean;
};

export const useFetch = <T>(method: string, url: string, transformationFn: ((data: T | T[]) => T | T[]) | null = null , data?: unknown): APIResponse<T> => {
  const [state, setState] = useState<APIResponse<T>>({
    status: 0,
    statusText: "",
    data: null,
    error: null,
    loading: true,
  });

  const getData = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await axios({ method, url, data });
      const transformedData = transformationFn ? transformationFn(response.data) : response.data;
      console.log(response);

      setState({
        status: response.status,
        statusText: response.statusText,
        data: transformedData,
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
  }, []);
  
  return state;
};
