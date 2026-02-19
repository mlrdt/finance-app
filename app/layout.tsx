import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance App",
  description: "Finance App by Melted",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
