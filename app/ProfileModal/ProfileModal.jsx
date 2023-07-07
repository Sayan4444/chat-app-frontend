import React from "react";
import Image from "next/image";
import Modal from "../components/Modal";
import { useContextProvider } from "../Context/Store";

export default function ProfileModal({ type }) {
  const {
    userData,
    chatBoxInfo,
    setShowProfileModal = null,
    setShowSelectedUserProfileModal = null,
  } = useContextProvider();

  let data, setShowModal;
  if (type === "signedin-profile") {
    data = userData;
    setShowModal = setShowProfileModal;
  } else if (type === "selected-user") {
    if (chatBoxInfo.users[0]._id !== userData._id) data = chatBoxInfo.users[0];
    else data = chatBoxInfo.users[1];
    setShowModal = setShowSelectedUserProfileModal;
  }

  const { name, email, picture } = data;
  return (
    <>
      <Modal setShowModal={setShowModal}>
        <div className='flex flex-col items-center space-y-6'>
          <div className='text-2xl laptop:text-4xl'>{name}</div>
          <div>
            <Image
              src={picture}
              width={100}
              height={100}
              alt='profile picture'
              className='rounded-[50%] hover:cursor-pointer'
              onClick={() => window.open(picture, "_blank")}
            />
          </div>
          <div className='text-center text-lg laptop:text-3xl break-all'>
            <div>Email:</div>
            <div>{email}</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
