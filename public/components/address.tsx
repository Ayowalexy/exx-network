import { useEffect, useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

type prop = {
  address?: string | undefined;
  type: "single" | "csv";
  add?: string
};

export const Address: React.FC<prop> = ({ address, type = "csv", add }) => {
  const [data, setData] = useState<string[]>([]);
  console.log(address);
  useEffect(() => {
    address && setData(address?.split("0x").slice(1));
  }, []);
  return (
    <>
      <div className="w-full h-[102px] rounded-[10px] border pl-5 flex flex-col justify-center bg-white">
        <div className="text-[#70707B] font-inter text-[13px]">
          Total number of token to send
        </div>
        <div className="font-inter text-primary font-bold text-[24px]">
          {type === "csv"
            ? data.reduce((a, b) => {
                Number(b.split(",")[1]);
                return Number(b.split(",")[1]) + Number(a);
              }, 0)
            : add?.split(",")[1]}
          .00 BNB
        </div>
      </div>
      <div className="flex justify-between items-center pt-2 pb-9">
        <div className="text-[#A0A0AB] font-inter text-[12px]">
          Token Balance <span className="text-primary">0BNB</span>
        </div>
        <div className="text-[#A0A0AB] font-inter text-[12px]">
          BNB Balance <span className="text-primary">0BNB</span>
        </div>
      </div>
      <div className="bg-[#FFFCF5] mb-4 flex justify-start items-center pl-4 gap-4 w-full h-[52px] rounded-[8px] border border-[#FEC84B]">
        <AiOutlineWarning fill="#DC6803" />
        <div className="font-thin text-[#DC6803] text-[14px] font-inter">
          Not enough token in your wallet
        </div>
        <div className="font-bold text-[#DC6803] text-[13px] font-inter">
          Add funds
        </div>
      </div>
      <div className="text-black">List of recipients</div>
      <div className="h-fit max-h-[350px] relative overflow-y-scroll">
        {type === "csv" ? (
          data?.map((element, idx) => (
            <div
              key={element}
              className="flex border-b pt-8 justify-between items-center"
            >
              <div className="font-inter font-thin text-[#70707B] text-sm">
                0x{element.split(",")[0]}
              </div>
              <div className="font-inter text-primary font-bold  text-sm">
                {element.split(",")[1]}
              </div>
            </div>
          ))
        ) : (
          <div className="flex border-b pt-8 justify-between items-center">
            <div className="font-inter font-thin text-[#70707B] text-sm">
              {add?.split(",")[0]}
            </div>
            <div className="font-inter text-primary font-bold  text-sm">
              {add?.split(",")[1]}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
