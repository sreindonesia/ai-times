import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Providers from "./providers/ReactQueryProvider";
import ToastProvider from "./components/Toast/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forum Pemimpin Redaksi",
  description:
    "Forum Pemred didirikan untuk memajukan pers dan memperjuangkan independensi pers dari pengaruh kekuasaan, kelompok kepentingan, kekuatan ekonomi, dan pihak-pihak lain.",
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
