import LoggedInUser from "./Message UI/LoggedInUser";
import OtherUser from "./Message UI/OtherUser";

export default function ShowMessages({ loggedInId, selectedMessages }) {
  return (
    <>
      <div className='flex flex-col space-y-2 mx-10 py-3'>
        {selectedMessages.length !== 0 &&
          selectedMessages.map((msg, index) =>
            msg.sender._id === loggedInId ? (
              <LoggedInUser key={msg._id} message={msg.content} />
            ) : (
              <OtherUser
                key={msg._id}
                displayIcon={
                  msg.sender._id !== selectedMessages[index - 1]?.sender._id
                }
                message={msg.content}
                sender={msg.sender}
              />
            )
          )}
      </div>
    </>
  );
}
