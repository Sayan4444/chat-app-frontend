import { useContextProvider } from "@/Context/Store";
import { BsSearch } from "react-icons/bs";

export default function SearchUser() {
  const { setSideDrawerActive } = useContextProvider();
  return (
    <button
      className='flex items-center justify-between w-auto laptop:w-32 font-semibold hoverEffect'
      onClick={() => setSideDrawerActive((prev) => !prev)}
    >
      <span>
        <BsSearch />
      </span>
      <span className='hidden laptop:block'>Search User</span>
    </button>
  );
}
