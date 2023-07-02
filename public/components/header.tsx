import { IoFlashOutline,  } from 'react-icons/io5';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineSetting } from 'react-icons/ai';
import Image from 'next/image';


export const Header = () => {
    return (
        <div className="flex justify-end items-center bg-white fixed w-full z-10 h-[80px] border-b-[0.7px] mb-[60px]">
            <div className="flex justify-center items-center gap-6 mr-6">
                <div className='flex cursor-pointer justify-center items-center gap-5 border w-[150px] rounded-lg h-[40px]'>
                    <IoFlashOutline />
                    <div className='font-inter text-[#344054] text-sm'>Upgrade now</div>
                </div>
                <AiOutlineSetting />
                <IoIosNotificationsOutline />
                <Image src='./images/svgs/sidebar-icons/hero.svg' alt='hero' width={30} height={30} />
            </div>
        </div>
    )
}