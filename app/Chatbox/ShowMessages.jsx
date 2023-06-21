import { useContextProvider } from "../Context/Store";

export default function ShowMessages() {
  const { selectedMessages } = useContextProvider();
  console.log(selectedMessages);
  return (
    <>
      <div className='flex flex-col space-y-2'>
        {selectedMessages.length !== 0 &&
          selectedMessages.map((msg) => <div>{msg}</div>)}
      </div>
    </>
  );
}
