import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";
import Script from 'next/script' 



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
    <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XWXS5CQ2EP"  />
        
        <Script id="google-analytics" >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XWXS5CQ2EP');
          `}
        </Script>
        <meta name="google-site-verification" content="IZgAcFb_r097qMjgtbvRUz8QiShiAvyPxLzxDIkb9zk" />
      </head>
      <body className={inter.className} >
        
            <Navbar />
          
<main className="max-w-full mx-auto px-6 sm:px-20 lg:px-40">{children}</main> 
        
        </body>
    </html>
  );
}
