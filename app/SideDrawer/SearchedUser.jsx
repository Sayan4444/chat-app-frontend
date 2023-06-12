import Image from "next/image";

export default function SearchedUser({ user }) {
  const { name, email, picture } = user;
  return (
    <>
      <button className='bg-gray-200 px-3 py-2 flex text-left rounded-xl hover:bg-cyan-600 hover:text-white transition-all duration-300'>
        <div>
          <Image src={picture} width={20} height={20} />
        </div>
        <div>
          <div className='font-bold'>{name}</div>
          <div>Email:{email}</div>
        </div>
      </button>
    </>
  );
}
