import Navbar from "@/component/shared/Navbar";

import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Rose-startups",
  description: "startups pitch website",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
            <Navbar />
            {children}
        </main>
      </body>
    </html>
  );
}
