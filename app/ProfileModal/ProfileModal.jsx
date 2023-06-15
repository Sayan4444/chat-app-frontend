import React from "react";
import Image from "next/image";
import Modal from "../components/Modal";
import { useContextProvider } from "../Context/Store";

export default function ProfileModal({ type }) {
  const {
    userData,
    selectedUserData,
    setShowProfileModal = null,
    setShowSelectedUserProfileModal = null,
  } = useContextProvider();

  let data, setShowModal;
  if (type === "signedin-profile") {
    data = userData;
    setShowModal = setShowProfileModal;
  } else {
    data = selectedUserData;
    setShowModal = setShowSelectedUserProfileModal;
  }

  const { name, email, picture } = data;
  return (
    <>
      <Modal setShowModal={setShowModal}>
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
          <div className='text-center text-3xl'>
            <div>Email:</div>
            <div>{email}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
