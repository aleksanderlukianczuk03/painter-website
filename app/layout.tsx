import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const lora = Lora({ subsets: ["latin"], weight: "400", variable: '--font-lora' });

// Updated Metadata for your Art Portfolio
export const metadata: Metadata = {
  title: {
    default: "Your Name - Artist", // CHANGE "Your Name"
    template: "%s | Your Name - Artist", // CHANGE "Your Name"
  },
  description: "Original oil paintings by [Your Name]. Still life and floral works.", // CHANGE "Your Name"
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-website.com", // CHANGE to your domain
    title: "Your Name - Artist", // CHANGE "Your Name"
    description: "Original oil paintings by [Your Name]. Still life and floral works.", // CHANGE "Your Name"
  },
  keywords: ["Fine Art", "Oil Painting", "Still Life", "Floral Art", "Original Artwork", "Your Name"], // CHANGE "Your Name"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Set the 'dark' class to apply our new theme globally
    <html lang="en" >
      <head>
        {/* Your existing scripts */}
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-XWXS5CQ2EP" />        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XWXS5CQ2EP');
          `}
        </Script>
        <meta name="google-site-verification" content="IZgAcFb_r097qMjgtbvRUz8QiShiAvyPxLzxDIkb9zk" />
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <Navbar />
        <main className="max-w-full mx-auto px-6 sm:px-20 lg:px-40">{children}</main>
      </body>
    </html>
  );
}
