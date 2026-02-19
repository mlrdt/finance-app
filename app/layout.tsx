import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Finance App - Melted",
  description: "Personal Finance Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64">
            <Header />
            <div className="p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
