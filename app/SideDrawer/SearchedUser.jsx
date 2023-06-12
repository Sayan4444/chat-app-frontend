import Image from "next/image";

export default function SearchedUser({ user }) {
  const { name, email, picture } = user;
  return (
    <>
      <button className='bg-gray-200 px-3 py-2 flex items-center space-x-6 text-left rounded-xl hover:bg-cyan-600 hover:text-white transition-all duration-300'>
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
          <div>Email:</div>
          <div>{email}</div>
        </div>
      </button>
    </>
  );
}
