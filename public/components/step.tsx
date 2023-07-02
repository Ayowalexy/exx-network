import { AiOutlineCheck } from "react-icons/ai";

export const Step = ({ step }: { step: number }) => {
  return (
    <div className="flex justify-between items-center w-[312px]">
      <div className="flex gap-2 items-center flex-col">
        <div className="bg-[#F4F3FF] border-2 border-primary w-[34px] h-[34px] rounded-[50%] flex justify-center items-center">
          {step === 1 && (
            <div className="w-[9px] h-[9px] bg-[#6938EF] rounded-[50%]" />
          )}
          {step === 2 && <AiOutlineCheck fill="#6938EF" />}
        </div>
        <div className="font-inter text-primary text-sm">Prepare</div>
      </div>
      <div
        style={{ borderColor: step === 1 ? "#E4E4E7" : "#6938EF" }}
        className="border-[0.7px] -mr-[14px] -ml-[8px] grow -mt-[27px]"
      />
      <div className="flex gap-2 items-center flex-col">
        <div
          style={{ border: step === 2 ? "2px solid #6938EF" : "" }}
          className="border w-[34px] h-[34px] rounded-[50%] flex justify-center items-center"
        >
          <div
            style={{ backgroundColor: step === 1 ? "#A0A0AB" : "#6938EF" }}
            className="w-[7px] h-[7px] bg-[#E4E4E7] rounded-[50%]"
          />
        </div>
        <div
          style={{ color: step === 1 ? "#A0A0AB" : "#6938EF" }}
          className="font-inter text-inactive text-sm"
        >
          Summary
        </div>
      </div>
    </div>
  );
};
