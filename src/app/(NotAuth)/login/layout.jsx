import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import { Toaster } from "sonner";

export default function layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen text-neutral-100">
    <Toaster position="top-center" richColors expand={true}/>
      {/* header */}
      <div className="inset-0 absolute aspect-[1785/510] z-0">
          <Image src="/welcome.webp" alt="welcome" fill  className="object-contain" />
      </div>
      {/* content */}
      <div className="z-10 flex-1 pt-[19vw]">{children}</div>
      {/* footer */}
      <Footer/>
    </div>
  );
}
