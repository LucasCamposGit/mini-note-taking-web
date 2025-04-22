import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoginProvider } from "@/context/LoginContext";
import LoginWithGoogleProvider from "@/context/LoginWithGoogleContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Notes",
  description: "Note-taking app",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginWithGoogleProvider>
          <LoginProvider>{children}</LoginProvider>
        </LoginWithGoogleProvider>
      </body>
    </html>
  );
}
