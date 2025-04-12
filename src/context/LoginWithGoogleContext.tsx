import { GoogleOAuthProvider } from "@react-oauth/google";

interface GoogleLoginProviderProps {
  children: React.ReactNode;
}

export default function GoogleLoginProvider({ children }: GoogleLoginProviderProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
}
