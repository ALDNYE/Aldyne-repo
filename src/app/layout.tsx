"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <head>
          <link rel="icon" href="/aphadyne.jpeg" />
          <title>Alphadyne Asset Management</title>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          <TooltipProvider>
            {!isDashboard && <Navbar />}

            <main>{children}</main>
            <Toaster
              position="bottom-right"
              richColors
              closeButton
            />
            {!isDashboard && <Footer />}
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
