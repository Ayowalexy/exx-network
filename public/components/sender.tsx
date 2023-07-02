import { Step } from "./step";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { BsPlusCircleDotted } from "react-icons/bs";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import * as XLSX from "xlsx";
import { Address } from "./address";
import { useToast } from "../context/toast";
import {
  validateAddressLength,
  validateIfAmountWasAdded,
  validateInvalidAmound,
  validateAddressCharacter,
  validateInaccurateAddress,
} from "../utils/validators";

export const Sender = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [value, setValue] = useState<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const { setShowToast } = useToast();
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"single" | "csv">("csv");
  const [hasDuplicate, setHasDuplicate] = useState<
    "duplicate" | "no dup" | "valid" | ""
  >("");
  const [numOfLines, setNumOfLines] = useState<number>(1);
  const [data, setData] = useState<any>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const regex = /^[a-f0-9]+$/i;

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
    const lastCharacter = value.slice(value.length - 1);
    const isValid = regex.test(lastCharacter);

    const newAaddress: { address: string; value: string } = {
      address: "",
      value: "",
    };

    switch (isValid) {
      case true:
        if (value.length === 5) {
          newAaddress.address = value;
          value = value.concat(",");
        }
        // setValue(value);
        return;
      case false:
        event.preventDefault();
        return;
      default:
        null;
    }
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" || event.key === "Return") {
      value && setNumOfLines(value.children.length + 2);
    }
  };

  const handleUploadXLX = async (e: any) => {
    const reader = new FileReader();
    const parent = document.querySelector(".par");
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = async (e: ProgressEvent<FileReader>) => {
      const data = e.target && e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData: { address: string; amount: number }[] =
        XLSX.utils.sheet_to_json(sheet);
      parsedData.map(
        (abc: { address: string; amount: number }, idx: number) => {
          if (!abc.address || !abc.amount) {
            alert("Address or amount is absent in one these fields");
            return;
          }
          const newLe = document.createElement("div");
          console.log(abc.address, abc.amount, "abg");
          newLe.textContent = abc.address
            .toString()
            .concat(", ", abc.amount.toString());
          newLe.className = "leading-[25px] text-[#70707B] text-sm anim";
          parent?.appendChild(newLe);
          setNumOfLines((prev) => prev + idx);
          setValue(parent as HTMLDivElement);
        }
      );
    };
  };

  const handleChange = (event: ChangeEvent<HTMLDivElement>) => {
    if (numOfLines !== event.target.childNodes.length) {
      setNumOfLines(event.target.childNodes.length);
    }
    const doc = document.querySelectorAll(".anim");
    if (doc.length) {
      for (let ele of Array.from(doc)) {
        if (!ele.classList.contains("anim2")) {
          ele.classList.add("anim2");
        }
      }
    }
    setValue(event.target);
  };

  const handleValidate = (): void => {
    setData([]);
    let err = 0;
    const children = (value && Array.from(value.childNodes)) || [];
    for (let i = 0; i < children.length; i++) {
      const ele = children[i];
      const textContext: string | undefined = ele.textContent?.toString();
      for (let j = i + 1; j < children.length; j++) {
        const nextEle = children[j];
        if (ele.textContent === nextEle.textContent) {
          const newLe = document.createElement("div");
          newLe.textContent = ele.textContent;
          newLe.className = "leading-[25px] text-[red] text-sm anim";
          if (ele.parentNode) {
            ele.parentNode.replaceChild(newLe, ele);
            err = err + 1;
            updateData(
              `Line ${i + 1}: Duplicate address ${ele.textContent}`,
              i + 1,
              "duplicate"
            );
          }
        }
      }

      if (textContext && validateInaccurateAddress(textContext)) {
        const newLe = document.createElement("div");
        newLe.textContent = ele.textContent;
        newLe.className = "leading-[25px] text-[red] text-sm anim";
        if (ele.parentNode) {
          ele.parentNode.replaceChild(newLe, ele);
          err = err + 1;
          updateData(
            `Line ${i + 1}: Inaccurate address ${ele.textContent}`,
            i + 1,
            "invalid"
          );
        }
      }

      if (textContext && validateIfAmountWasAdded(textContext)) {
        const newLe = document.createElement("div");
        newLe.textContent = ele.textContent;
        newLe.className = "leading-[25px] text-[red] text-sm anim";
        if (ele.parentNode) {
          ele.parentNode.replaceChild(newLe, ele);
          err = err + 1;
          updateData(
            `Line ${i + 1}: No amount added ${ele.textContent}`,
            i + 1,
            "amount"
          );
        }
      }

      if (textContext && validateInvalidAmound(textContext)) {
        const newLe = document.createElement("div");
        newLe.textContent = ele.textContent;
        newLe.className = "leading-[25px] text-[red] text-sm anim";
        if (ele.parentNode) {
          ele.parentNode.replaceChild(newLe, ele);
          err = err + 1;
          updateData(
            `Line ${i + 1}: Invalid amount ${ele.textContent}`,
            i + 1,
            "amount"
          );
        }
      }

      if (textContext && validateAddressLength(textContext)) {
        const newLe = document.createElement("div");
        newLe.textContent = ele.textContent;
        newLe.className = "leading-[25px] text-[red] text-sm anim";
        if (ele.parentNode) {
          ele.parentNode.replaceChild(newLe, ele);
          err = err + 1;
          updateData(
            `Line ${i + 1}: Invalid address length ${ele.textContent}`,
            i + 1,
            "length"
          );
        }
      }

      if (textContext && validateAddressCharacter(textContext)) {
        const newLe = document.createElement("div");
        newLe.textContent = ele.textContent;
        newLe.className = "leading-[25px] text-[red] text-sm anim";
        if (ele.parentNode) {
          ele.parentNode.replaceChild(newLe, ele);
          err = err + 1;
          updateData(
            `Line ${i + 1}: Invalid address character ${ele.textContent}`,
            i + 1,
            "character"
          );
        }
      }
    }

    if (err === 0 && value?.childNodes.length) {
      setHasDuplicate("valid");
      setStep(2);
      setType("csv");
      setAddress("");
    }
  };

  const handleBlur = () => {
    let err = 0;
    if (validateAddressCharacter(address)) {
      err = err + 1;
      setErrors([
        ...errors,
        "Your address has invalid characters, only 0 - 9 and a - f characters allowed",
      ]);
    }
    if (validateAddressLength(address)) {
      err = err + 1;
      setErrors([...errors, "The length of your address is invalid"]);
    }
    if (validateIfAmountWasAdded(address)) {
      err = err + 1;
      setErrors([...errors, "No amount has been added"]);
    }
    if (validateInvalidAmound(address)) {
      err = err + 1;
      setErrors([...errors, "You have not added amount"]);
    }
    if (validateInaccurateAddress(address)) {
      err = err + 1;
      setErrors([...errors, "Invalid address"]);
    }

    if (err === 0) {
      const divElement = document.createElement("div");
      setValue(divElement);
      setHasDuplicate("valid");
      setStep(2);
      setType("single");
    }
  };

  const handleMerge = () => {
    const index = data.findIndex(
      (ele: { type: string }) => ele.type === "duplicate"
    );
    const children = (value && Array.from(value.childNodes)) || [];
    for (let i = 0; i < children.length; i++) {
      if (i === index) {
        value?.removeChild(children[i]);
      }
    }
  };

  const handleGoBack = () => {
    const divElement = document.createElement("div");
    setValue(divElement);
    setStep(1);
    setHasDuplicate("");
    setNumOfLines(1);
  };

  const toggleState = () => {
    const doc = document.querySelector(".exp2");
    const doc2 = document.querySelector(".relate");
    doc2?.classList.toggle("relative");
    doc?.classList.toggle("exp");
  };

  const updateAllAmount = () => {
    const children = (value && Array.from(value.childNodes)) || [];
    for (let child of children) {
      child.textContent =
        child.textContent?.split(",")[0].concat(", ", amount.toString()) || "";
    }
  };

  const updateData = (msg: string, line: number, type: string) => {
    setData((prev: { msg: string; line: string }[]) => [
      ...prev,
      {
        msg,
        line,
        type,
      },
    ]);
  };

  useEffect(() => {
    const divElement = document.createElement("div");
    setValue(divElement);
  }, []);

  useEffect(() => {
    if (data.length) {
      const hasDuplicate = data.some(
        (ele: { type: string }) => ele.type === "duplicate"
      );
      setHasDuplicate(hasDuplicate ? "duplicate" : "no dup");
    }
  }, [data]);

  return (
    <div className="w-full z-0 flex pb-[100px] flex-col pt-[10%] justify-center items-center pl-[20%]">
      <Step step={step} />
      <div className="w-1/2 relate relative bg-white p-[30px] mt-[50px] h-fit pb-[20px] rounded-xl border  overflow-hidden">
        <div className="font-inter text-black text-[30px]">Sender</div>
        <div className="absolute top-0 right-0">
          <Image
            src="./images/svgs/sidebar-icons/circle.svg"
            alt="image"
            width={470}
            height={604}
          />
        </div>
        {hasDuplicate === "valid" ? (
          <Address
            type={type}
            add={address}
            address={value?.textContent?.toString()}
          />
        ) : (
          <>
            <div className="w-full">
              <div className="font-inter text-[#3F3F46] text-sm">
                Enter address
              </div>
              <input
                placeholder="Enter address here"
                // value={address}
                onChange={(e) =>
                  e.target.value.length === 40
                    ? setAddress(e.target.value.concat(", "))
                    : (setAddress(e.target.value), setErrors([]))
                }
                onBlur={handleBlur}
                className="h-[48px] pl-[30px] focus:outline-none text-[#70707B] mt-[15px] w-full z-50 rounded-[24px] border-[0.7px] border-b2"
              />
            </div>
            {errors.length && (
              <ul>
                {errors.map((ele) => (
                  <li
                    key={ele}
                    className="text-[red] font-thin text-[12px] font-inter"
                  >
                    {ele}
                  </li>
                ))}
              </ul>
            )}
            <div>
              <div className="font-inter text-[#3F3F46] pt-[20px] text-sm">
                List addresses in CSV
              </div>
              <div className="flex exp2 border-[0.7px] rounded-[24px] border-b2 w-full h-[300px] relative">
                <div className="flex items-center pt-[15px] flex-col border-r-[0.7px] border-r-b2 bg-[#F4F3FF] w-[37px] rounded-tl-[24px] rounded-bl-[24px]">
                  {Array(numOfLines)
                    .fill("_")
                    .map((element: string, idx: number) => (
                      <div
                        key={idx}
                        className="font-inter text-b2 leading-[25px] text-sm"
                      >
                        {idx + 1}
                      </div>
                    ))}
                </div>
                <div
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={toggleState}
                  className="right-0 rounded-tr-[24px] transition ease-in-out rounded-bl-[24px] transition ease-in-out cursor-pointer absolute hover:bg-primary w-[40px] h-[40px]"
                >
                  <div className="flex justify-center items-center h-full w-full">
                    <Image
                      className=""
                      src={`./images/svgs/sidebar-icons/${
                        !hover ? "expand.svg" : "white.svg"
                      }`}
                      width={15}
                      height={15}
                      alt="icon"
                    />
                  </div>
                </div>
                <div
                  contentEditable
                  onKeyDown={handleTextareaKeyDown}
                  className="w-full par font-inter leading-[25px] text-[#70707B] text-sm focus:outline-none p-[14px] rounded-tr-[24px] rounded-br-[24px]"
                  style={{ minHeight: "100px" }}
                  onInput={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between items-center w-full pt-[4px]">
              <a
                target="_blank"
                href="https://res.cloudinary.com/dquiwka6j/raw/upload/v1688334859/wncuo6v3ino3yim5tome.xlsx"
              >
                <div className="font-inter text-primary text-sm cursor-pointer">
                  Show sample csv
                </div>
              </a>
              <label
                htmlFor="filer"
                className="flex cursor-pointer justify-center items-center gap-3"
              >
                <BsPlusCircleDotted fill="#A0A0AB" />
                <input
                  accept=".xlsx, .xls"
                  onChange={handleUploadXLX}
                  type="file"
                  id="filer"
                  style={{
                    display: "none",
                  }}
                />
                <div className="font-inter text-primary text-[16px]">
                  Upload CSV
                </div>
              </label>
            </div>
            <div className="flex justify-between items-center w-full pt-[6px]">
              <div className="font-inter text-sm text-black pt-[10px]">
                *Enter same amount for all addresses
              </div>
              <Toggle
                defaultChecked={checked}
                icons={false}
                onChange={() => setChecked(!checked)}
              />
            </div>
            {checked && (
              <input
                type="number"
                onBlur={updateAllAmount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
                className="h-[48px] text-[#70707B] focus:outline-none pl-[30px] font-inter text-sm mt-[15px] w-full rounded-[24px] bg-[#FAFAFA]"
              />
            )}
            {data.length ? (
              <div className="border border-[red] rounded-[10px] p-4 mt-4">
                {data.map(
                  (element: { msg: string; line: string }, idx: number) => (
                    <div className="pb-2" key={element.line + idx}>
                      <div className="text-[13px] text-[red] font-thin font-inter">
                        {element.msg}
                      </div>
                      <div className="text-[12px] text-[red] font-bold font-inter">
                        Go Line {element.line}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </>
        )}

        <div className="flex w-full gap-4 justify-between items-center">
          {hasDuplicate === "duplicate" && (
            <button
              onClick={handleMerge}
              className="bg-white border border-[#D1D1D6] w-1/2 outline-0 h-[50px] font-inter text-black text-sm mt-[30px] rounded-[24px]"
            >
              Merge
            </button>
          )}
          {hasDuplicate === "valid" && (
            <button
              onClick={handleGoBack}
              className="bg-white border border-[#D1D1D6] w-1/2 outline-0 h-[50px] font-inter text-black text-sm mt-[30px] rounded-[24px]"
            >
              Go back
            </button>
          )}
          <button
            onClick={() => (step === 1 ? handleValidate() : setShowToast(true))}
            className="bg-primary outline-0 h-[50px] grow font-inter text-white text-sm mt-[30px] rounded-[24px]"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
