import Image from "next/image";
import MainBody from "./(components)/MainBody";
import Footer from "./(components)/Footer";


export default function Home() {
  return (
<div className="bg-white rounded-t-3xl"> 
<div className="w-full bg-[#101820] h-8">
  <h4 className="text-white text-right pr-5 md:pr-40">العربية</h4>
</div>
  <MainBody />
 
</div>
  );
}
