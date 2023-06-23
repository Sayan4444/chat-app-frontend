import Image from "next/image";

export default function LoggedInUser({ message, sender, displayIcon }) {
  const { picture } = sender;
  return (
    <div className='self-start bg-green-200 px-4 py-2 rounded-2xl relative'>
      {displayIcon && (
        <div className='text-xs text-red-600 font-bold'>{sender.name}</div>
      )}
      {message}
      {displayIcon && (
        <Image
          src={picture}
          width={30}
          height={30}
          alt='profile picture'
          className='absolute -left-8 top-2 rounded-[50%] hover:cursor-pointer'
          onClick={() => window.open(picture, "_blank")}
        />
      )}
    </div>
  );
}
