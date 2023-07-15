import MessageUI from "./MessageUI";

export default function ShowMessages({ loggedInId, showMessages }) {
  return (
    <>
      <div className='flex flex-col space-y-2 ml-10 mr-3 laptop:mx-10 py-3'>
        {showMessages.map((msg, index) => {
          if (msg.sender._id === loggedInId) {
            return (
              <MessageUI
                key={msg._id}
                message={msg}
                type='loggedInUser'
                displayIcon={false}
                prevMessageCreatedAt={showMessages[index - 1]?.createdAt}
              />
            );
          } else
            return (
              <MessageUI
                key={msg._id}
                message={msg}
                type='otherUser'
                displayIcon={
                  msg.sender._id !== showMessages[index - 1]?.sender._id
                }
                prevMessageCreatedAt={showMessages[index - 1]?.createdAt}
              />
            );
        })}
      </div>
    </>
  );
}
