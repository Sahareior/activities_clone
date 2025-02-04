import { Geist, Geist_Mono } from "next/font/google";
import DetailsHeader from "./DetailsHeader";
import Footer from "../(components)/Footer";
import RFooter from "./RFooter";
import Float from "../(components)/Float";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-200 md:p-5  antialiased`}
      > 
     <DetailsHeader />
        {children}
        <Float />
    <RFooter />

      </body>
    </html>
  );
}
