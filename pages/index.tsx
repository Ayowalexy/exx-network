import Image from "next/image";
import { Inter } from "next/font/google";
import { Sidebar } from "@/public/components/sidebar";
import { Header } from "@/public/components/header";
import { Sender } from "@/public/components/sender";
import { GrClose } from "react-icons/gr";
import { useEffect } from "react";
import { useToast } from "@/public/context/toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { showToast, setShowToast } = useToast();

  const close = () => {
    const doc = document.querySelector(".toast");
    doc?.classList.remove("toaster");
    setShowToast(false);
  };

  useEffect(() => {
    if (showToast) {
      const doc = document.querySelector(".toast");
      doc?.classList.add("toaster");
      setTimeout(() => {
        doc?.classList.remove("toaster");
      }, 3000);
    }
  }, [showToast]);

  return (
    <div className="h-fit min-h-screen w-full bg-w flex justify-between align-center">
      <Sidebar />
      <div className="grow">
        <Header />
        <Sender />
        <div className="w-[400px] toast h-[98px] bg-white shadow-lg shadow-[rgba(0,0,0,0.1)] z-30 rounded-lg absolute right-10 -top-[200px]">
          <div className="w-[400px] h-[98px] flex justify-between pl-5 pr-5 items-start pt-4">
            <Image
              src="./images/svgs/sidebar-icons/check.svg"
              height={42}
              width={42}
              alt="icon"
            />
            <div className="w-[80%]">
              <div className="text-[#101828] font-inter font-bold">
                Successfully sent token
              </div>
              <div className="text-sm font-inter text-[#667085]">
                Your token has been successfully sent to all addresses
              </div>
            </div>
            <div className="cursor-pointer" onClick={close}>
              <GrClose />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
