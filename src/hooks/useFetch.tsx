"use client";

import { useState } from "react";
import {
  LOGIN_CONTEXT_ACTIONS,
  useLogin,
  useLoginDispatch,
} from "@/context/LoginContext";
import { useRouter } from "next/navigation";

const useFetch = () => {
  const { token } = useLogin();
  const loginDispatch = useLoginDispatch();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async (
    path: string,
    method: string,
    body: any | null = null
  ): Promise<any> => {
    try {
      const url = `${apiUrl}${path}`;
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      };

      let response = await fetch(url, options);
      let data = await response.json();

      if (response.status === 401) {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) throw new Error("Token expired. Please login again.");

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        if (!apiUrl) throw new Error("API URL not found");
        const refreshData = await fetchRefreshToken(refresh_token, apiUrl);

        loginDispatch({
          type: LOGIN_CONTEXT_ACTIONS.REFRESH_TOKEN,
          payload: {
            logged: true,
            token: refreshData.token,
            refresh_token: refreshData.refresh_token,
          },
        });

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${refreshData.token}`,
        };
        response = await fetch(url, options);
        data = await response.json();

        setData(data);
        setError(null);
        return data;
      }

      if (response.status === 400) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        loginDispatch({
          type: LOGIN_CONTEXT_ACTIONS.LOGOUT,
          payload: { logged: false, token: null, refresh_token: null },
        });
        router.push("/");
      } else if (response.status === 402) {
        router.push("/");
      } else if (response.status === 404) {
        router.push("/404");
      } else if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar os dados.");
      }

      setResponse(response);
      setData(data);
      setError(null);
      return data;
    } catch (err) {
      const message = (err as Error).message || "Erro ao buscar os dados.";
      setError(message);
    }
  };

  return { fetchData, data, error, response };
};

const fetchRefreshToken = async (refresh_token: string, apiUrl: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  };

  const response = await fetch(`${apiUrl}/api/refresh-token`, options);
  const data = await response.json();
  return data;
};

export default useFetch;
