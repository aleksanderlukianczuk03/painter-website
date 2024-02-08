import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Immunifai Blog",
    template: "%s | Immunifai Blog",
  },
  description: "%s",
  // twitter: {
  //   card: "summary_large_image"
  // },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "%s",
    
  },
  keywords: ["Immunifai", "Blog", "Health", "Wellness", "Fitness", "Nutrition"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={inter.className} >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
          
<main className="max-w-full mx-auto px-6 sm:px-20 lg:px-40">{children}</main> 
        </ThemeProvider>
        </body>
    </html>
  );
}
