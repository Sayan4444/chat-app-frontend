import { RxCross2 } from "react-icons/rx";

export default function SelectedUsers({
  selectedUser,
  setSelectedUsers,
  index,
}) {
  const { name, _id } = selectedUser;
  return (
    <>
      <div className='bg-violet-700 text-white flex space-x-2 items-center pl-3 pr-2 py-2 rounded-xl'>
        <span className='font-semibold'>{name}</span>
        <span onClick={removeSelectedUser} className='hover:cursor-pointer'>
          <RxCross2 />
        </span>
      </div>
    </>
  );
  function removeSelectedUser() {
    setSelectedUsers((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }
}
