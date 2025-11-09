import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
    <html className="h-full" lang="en">
      <body className="flex flex-col h-full">
        <main className="grow">{children}</main>
        <footer className="bg-gray-500/20 mt-20 px-8 py-4">
          Contains public sector information licensed under the Open Government
          Licence v3.0 | Thanks to{" "}
          <Link
            className="text-blue-500 underline"
            href="https://www.openstreetmap.org/user/CjMalone"
          >
            CJ Malone
          </Link>{" "}
          for geo-coding the data!
        </footer>
      </body>
    </html>
  );
}
