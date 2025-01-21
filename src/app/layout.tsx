import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {} from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeProvider";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const sourGummy = localFont({
  src: "./fonts/SourGummy-VariableFont_wdth,wght.ttf",
  variable: "--sour-gummy",
  weight: "100 900",
});

const baloo = localFont({
  src: "./fonts/Baloo2-VariableFont_wght.ttf",
  variable: "--baloo",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className={` ${sourGummy.variable} ${baloo.variable}  antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
