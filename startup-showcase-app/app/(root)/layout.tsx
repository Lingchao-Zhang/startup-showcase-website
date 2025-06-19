import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <main>
            <Navbar />
            {children}
            <Toaster />
        </main>
  );
}
