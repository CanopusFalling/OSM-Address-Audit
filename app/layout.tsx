import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSM Address Audit",
  description:
    "Auditing addresses in the OSM database using data published by local authorities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer>
          Contains public sector information licensed under the Open Government
          Licence v3.0
        </footer>
      </body>
    </html>
  );
}
