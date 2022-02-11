import Button from "@atoms/button";
import Modal from "@atoms/modal";
import { mockUser } from "@libs/mock-data";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaQuestionCircle, FaStar } from "react-icons/fa";
import { IUser } from "src/types/users";

interface Props {
    isOpen: boolean;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    user: IUser;
}

const UserCardModal = ({ isOpen, setModalOpen, user }: Props) => {
    return <Modal title="" isOpen={isOpen} onActionBtnClick={() => setModalOpen(false)} setIsOpen={setModalOpen} withActionBtn={true} className="bg-[#E0FAF8] rounded-[10px] px-[11px] pb-[30px] w-[350px]" actionBtnClassName='bg-[#E0FAF8] border border-[#00D0BE] w-full text-[#006E72] rounded-[5px] text[15px] font-[800] h-[45px]' btnnText="Continue">
        <div className="flex">
            <div className="w-[126px] mr-[25px]">
                <Image src={mockUser.picture.medium} width={126} height={127} />
            </div>
            <div>
                <p className="font-semibold text-[15px] leading-6">{user?.name?.first} {user?.name?.last}</p>
                <p className="text-[#007575] font-normal leading-5 mt-1">@{user?.username || user?.name.last}</p>

                <p className="text-[#007575] font-[600] text-[10px] mt-[10px]">Following 1179 <span className="inline-block mx-3">|</span>333k Followers</p>

                <Button className="bg-[#03A9F4] rounded-[20px] font-extrabold mt-[12px] w-full text-white text-sm h-[34px]">Follow on Twitter</Button>
            </div>
        </div>

        <div className="px-4">
            <h3 className="mt-[32px] font-semibold text-sm">Description</h3>
            <p className="text-xs text-[#007575] leading-5 mt-1 font-normal">Archetype, epitome, exemplar, expression, personification, realization, symbol, cast, collect, comprehension, conformation, embracement.</p>

            <h3 className="mt-[25px] font-semibold text-sm">Vendly</h3>

            <div className="flex flex-col">
                <div className="flex mt-2">
                    <p className="text-[#007575] font-semibold text-xs w-24">Joined:</p>
                    <p className="font-semibold text-xs">November, 2021</p>
                </div>
                <div className="flex mt-5">
                    <p className="text-[#007575] font-semibold text-xs w-24">Strypes:</p>
                    <p className="font-semibold text-xs flex items-center"><span className="inline-block mr-2 leading-[14px]">Vendie</span> {Array(5).fill(1).map(() =><FaStar className="text-[#00D0BE] mb-1" />)} <FaQuestionCircle className="ml-3 mb-1 text-[#006E72]" /></p>
                </div>
                <div className="flex mt-5">
                    <p className="text-[#007575] font-semibold text-xs w-24">Degrees:</p>
                    <p className="font-semibold text-xs flex items-center">Business Leader <FaQuestionCircle className="ml-3 mb-1 text-[#006E72]" /></p>
                </div>
                <div className="flex mt-5">
                    <p className="text-[#007575] font-semibold text-xs w-24">Registration:</p>
                    <p className="font-semibold text-xs">Tier 1</p>
                </div>
            </div>
        </div>
    </Modal>
}

export default UserCardModal;