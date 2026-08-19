import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@components/layout/navbar/navbar";
import { Toaster } from "react-hot-toast";
import { Providers } from "./components/layout/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Socials",
  description: "All your socials in one place",
  generator: "Next.js",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: "text-sm" }} />
        </Providers>
      </body>
    </html>
  );
}
