import Image from "next/image";
import { useContextProvider } from "../Context/Store";

export default function SearchedUser({ user }) {
  const { setSelectedUserData, setSideDrawerActive } = useContextProvider();
  const { name, picture } = user;
  return (
    <>
      <div
        onClick={() => {
          setSelectedUserData(user);
          setSideDrawerActive(false);
        }}
        className='bg-gray-200 px-3 py-2 text-left rounded-xl hover:bg-cyan-600 hover:cursor-pointer hover:text-white transition-all duration-300'
      >
        <div className='flex items-center space-x-6'>
          <div>
            <Image
              src={picture}
              width={30}
              height={30}
              alt='avatar'
              className='rounded-[50%]'
            />
          </div>
          <div>
            <div className='font-bold'>{name}</div>
          </div>
        </div>
      </div>
    </>
  );
}
