import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Providers from "./providers/ReactQueryProvider";
import ToastProvider from "./components/Toast/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AITimes",
  description:
    "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <Providers>
        <ToastProvider>
          <body className={inter.className}>{children}</body>
        </ToastProvider>
      </Providers>
    </html>
  );
}
