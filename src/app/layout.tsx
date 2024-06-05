import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Board",
  description: "Andras Mihaly, Oregon State University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
