import Image from "next/image";

export default function SearchedUser({
  user,
  selectedUsers,
  setSelectedUsers,
}) {
  const { picture, name, _id } = user;
  return (
    <>
      <div
        onClick={clickHandler}
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
  function clickHandler() {
    for (let index = 0; index < selectedUsers.length; index++) {
      const selectedUser = selectedUsers[index];
      if (selectedUser._id === _id) return;
    }
    setSelectedUsers((prev) => [...prev, { name, _id }]);
    return;
  }
}
