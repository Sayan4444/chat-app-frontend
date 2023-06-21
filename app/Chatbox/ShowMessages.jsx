import LoggedInUser from "./Message UI/LoggedInUser";
import OtherUser from "./Message UI/OtherUser";

export default function ShowMessages({ loggedInId, selectedMessages }) {
  return (
    <>
      <div className='flex flex-col space-y-2 mx-10 py-3'>
        {selectedMessages.map((msg) =>
          msg.sender === loggedInId ? (
            <LoggedInUser key={msg._id} message={msg.content} />
          ) : (
            <OtherUser key={msg._id} message={msg.content} />
          )
        )}
      </div>
    </>
  );
}
