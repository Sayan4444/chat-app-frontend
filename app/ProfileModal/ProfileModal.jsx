import React from "react";
import Backdrop from "../components/Backdrop";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import Modal from "../components/Modal";

export default function ProfileModal({
  userData,
  setShowProfileModal = null,
  setShowSelectedUserProfileModal = null,
}) {
  const { name, email, picture } = userData;
  return (
    <>
      <Modal
        setShowProfileModal={setShowProfileModal}
        setShowSelectedUserProfileModal={setShowSelectedUserProfileModal}
      >
        <div className='flex flex-col items-center space-y-6'>
          <div className='text-4xl'>{name}</div>
          <div className=''>
            <Image
              src={picture}
              width={100}
              height={100}
              alt='profile picture'
              className='rounded-[50%] hover:cursor-pointer'
              onClick={() => window.open(picture, "_blank")}
            />
          </div>
          <div className='ml-10 self-start text-3xl'>
            <div>Email:</div>
            <div>{email}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
