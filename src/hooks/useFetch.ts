import axios from "axios";
import { useEffect, useState } from "react";

export type APIResponse<T> = {
  status: number;
  statusText: string;
  data: T | null;
  error: unknown;
  loading: boolean;
};


export const useFetch = <T>(url: string): APIResponse<T> => {
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
      const response = await axios.get<T>(url);
      let transformedData: T[] | T = response.data;
      if (response.data && Array.isArray(response.data)) {
        transformedData = response.data.map(element => {
          return element.date ? { ...element, date: new Date(element.date) } : element;
        });
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
