import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthDispatch } from "@/context/LoginContext";
import { AUTH_ACTION } from "@/types/action";
import useFetch from "@/hooks/useFetch";

export default function useGoogleSignIn() {
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const { fetchData } = useFetch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        setError(null);

        // 👉 Step 1: Use access_token to get Google user profile
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const profile = await userInfoRes.json();

        if (!profile || !profile.email || profile.email_verified !== true) {
          throw new Error("Invalid Google user");
        }

        // 👉 Step 2: Send verified Google user info to your backend
        const data = await fetchData(
          "/api/google-login",
          "POST",
          {
            token: tokenResponse.access_token,
          },
          false
        );

        // 👉 Step 3: Handle backend response
        if (data?.token && data?.refresh_token) {
          localStorage.setItem("access_token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);
          authDispatch({ type: AUTH_ACTION.LOGIN_SUCCESS, payload: { 
            token: data.token, 
            refreshToken: data.refresh_token,
            user: profile
          }});
          router.push("/mini-notes");
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Google login error:", err);
        setError("Failed to sign in with Google. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    },
    flow: "implicit",
  });

  return { login, isLoading, error };
}
