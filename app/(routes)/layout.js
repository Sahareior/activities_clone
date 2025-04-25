import { Geist, Geist_Mono } from "next/font/google";
import DetailsHeader from "./DetailsHeader";
import Footer from "../(components)/Footer";
import RFooter from "./RFooter";
import Float from "../(components)/Float";




export default function DetailsLayout({ children }) {
  return (
    <div className="bg-slate-500">
      <DetailsHeader />
      <main className="bg-slate-500  antialiased">
        {children}
      </main>
      <Float />
      <RFooter />
    </div>
  );
}

