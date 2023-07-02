import { routes } from "../navigation/routes";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import Collapsible from "react-collapsible";
import { PiCaretDown } from "react-icons/pi";
import { usePage } from "../context/navigation";
import { FiLogOut } from "react-icons/fi";

export const Sidebar = () => {
  const { page, setPage } = usePage();

  return (
    <div className="w-1/6 h-[100vh] fixed z-30 bg-white border-r p-[30px]">
      <Image
        src="./images/svgs/sidebar-icons/logo.svg"
        height={40}
        width={40}
        alt="logo"
      />
      <div className="pt-8">
        <div className="absolute m-3">
          <CiSearch size={19} fill="#667085" />
        </div>

        <input
          className="w-full h-[44px] rounded-lg border pl-10"
          placeholder="Search"
        />
        <div className="pt-8 ml-[-13px]">
          {routes.slice(0, 6).map((element, idx) => (
            <>
              {element.hasSubMenu ? (
                <Collapsible
                  transitionTime={200}
                  trigger={
                    <div
                      onClick={() => setPage(element.title)}
                      style={{
                        backgroundColor:
                          page === element.title ? "#F9F5FF" : "transparent",
                      }}
                      className="flex h-[40px] pl-3 pr-3 w-full rounded-lg justify-between items-center mb-4"
                    >
                      <div className="flex justify-start items-center gap-3 cursor-pointer">
                        <Image
                          src={element.icon}
                          width={20}
                          height={20}
                          alt="icon"
                        />
                        <div className="font-small text-[16px] text-gray0">
                          {element.title}
                        </div>
                      </div>
                      <PiCaretDown fill="#B692F6" size={20} />
                    </div>
                  }
                >
                  {typeof element.subMenu !== "undefined" &&
                    element.subMenu.map((element, idx) => (
                      <div className="font-small text-[15px] pb-5 ml-10 text-gray0">
                        {element.title}
                      </div>
                    ))}
                </Collapsible>
              ) : (
                <div
                  key={idx}
                  onClick={() => setPage(element.title)}
                  style={{
                    backgroundColor:
                      page === element.title ? "#F9F5FF" : "transparent",
                  }}
                  className="flex h-[40px] w-full justify-start items-center gap-3 pl-3 pr-3 mb-4 cursor-pointer"
                >
                  <Image src={element.icon} width={20} height={20} alt="icon" />
                  <div className="font-small text-[16px] text-gray0">
                    {element.title}
                  </div>
                </div>
              )}
            </>
          ))}
          <div className="absolute bottom-20">
            {routes.slice(6).map((element, idx) => (
              <div
                key={idx}
                onClick={() => setPage(element.title)}
                style={{
                  backgroundColor:
                    page === element.title ? "#F9F5FF" : "transparent",
                }}
                className="flex h-[40px] w-full justify-start items-center gap-3 pl-3 pr-3 mb-2 cursor-pointer"
              >
                <Image src={element.icon} width={20} height={20} alt="icon" />
                <div className="font-small text-[16px] text-gray0">
                  {element.title}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-start bottom-4 w-[90%] absolute gap-5 border-t border-t-[#EAECF0] pt-4 items-start">
            <Image
              src="./images/svgs/sidebar-icons/hero.svg"
              alt="hero"
              width={30}
              height={30}
            />
            <div>
              <div className="font-inter font-normal text-sm text-[#344054]">
                Olivia Rhye
              </div>
              <div className="font-inter font-thin text-sm text-[#667085]">
                olivia@untitledui.com
              </div>
            </div>
            <FiLogOut color="#344054" />
          </div>
        </div>
      </div>
    </div>
  );
};
