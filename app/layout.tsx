import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Motion from "@/components/Motion";

export const metadata: Metadata = {
  title: "LearnHub \u2014 Master New Skills",
  description: "A modern learning platform for developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Motion />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}