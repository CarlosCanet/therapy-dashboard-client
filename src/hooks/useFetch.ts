import axios from "axios";
import { useEffect, useState } from "react";

export type APIResponse<T> = {
  status: number;
  statusText: string;
  data: T | null;
  error: unknown;
  loading: boolean;
};

// async function doRequest<T>(method: string, url: string, body?: unknown): Promise<AxiosResponse<T>> {
//   switch (method.toLowerCase()) {
//     case "get":
//       return axios.get<T>(url);
//     case "post":
//       return axios.post<T>(url, body);
//     case "put":
//       return axios.put<T>(url, body);
//     case "patch":
//       return axios.patch<T>(url, body);
//     case "delete":
//       return axios.delete<T>(url);
//     default:
//       throw new Error(`Unsupported method: ${method}`);
//   }
// }

export const useFetch = <T>(method: string, url: string, data?: unknown): APIResponse<T> => {
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
      // const response = await axios.get<T>(url);
      // const response = await axios(method, url, data);
      const response = await axios({method, url, data});

      // 
      let transformedData: T[] | T = response.data as T | T[];
      if (method.toLowerCase() === "get") {
        if (response.data && Array.isArray(response.data)) {
          transformedData = response.data.map(element => {
            return element.date ? { ...element, date: new Date(element.date) } : element;
          });
        }
      }
      // console.log("useFetch:", transformedData, "url:", url, "response.data:", response.data);

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
