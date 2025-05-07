import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import MainLayout from "../layouts/MainLayout";
import "./globals.css";
import { Providers } from "./providers";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scholar Dashboard",
  description: "Your decentralized application dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito_sans.className}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
