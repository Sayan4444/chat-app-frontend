import { RxCross2 } from "react-icons/rx";

export default function SelectedUsers({
  selectedUsers,
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
    let newArray = [...selectedUsers];
    newArray.splice(index, 1);
    console.log(newArray);
    setSelectedUsers(newArray);
  }
}
