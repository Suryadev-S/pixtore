import {
  ClerkProvider,
} from '@clerk/nextjs'
import ReactQueryProvider from '@/lib/reactQueryProvider/provider';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from '@/components/ui/custom/Nav';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PicsStore",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ReactQueryProvider>
          <body className={inter.className}>
            <Nav />
            {children}
            <Toaster />
          </body>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  );
}
