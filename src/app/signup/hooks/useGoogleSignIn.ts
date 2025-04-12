import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginDispatch, LOGIN_CONTEXT_ACTIONS } from "@/context/LoginContext";
import useFetch from "@/hooks/useFetch";

export default function useGoogleSignIn() {
  const router = useRouter();
  const loginDispatch = useLoginDispatch();
  const { fetchData } = useFetch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchData(
          "/api/google-login",
          "POST",
          { token: tokenResponse.access_token },
          false
        );

        if (data?.token && data?.refresh_token) {
          localStorage.setItem("access_token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);
          loginDispatch({ type: LOGIN_CONTEXT_ACTIONS.LOGIN });
          router.push("/mini-notes");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch {
        setError("Failed to sign in with Google. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    },
  });

  return { login, isLoading, error };
}
