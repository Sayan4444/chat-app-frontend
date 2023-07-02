import MessageUI from "./MessageUI";

export default function ShowMessages({ loggedInId, selectedMessages }) {
  return (
    <>
      <div className='flex flex-col space-y-2 mx-3 laptop:mx-10 py-3'>
        {selectedMessages.length !== 0 &&
          selectedMessages.map((msg, index) => {
            if (msg.sender._id === loggedInId) {
              return (
                <MessageUI
                  key={msg._id}
                  message={msg}
                  type='loggedInUser'
                  displayIcon={false}
                  prevMessageCreatedAt={selectedMessages[index - 1]?.createdAt}
                />
              );
            } else
              return (
                <MessageUI
                  key={msg._id}
                  message={msg}
                  type='otherUser'
                  displayIcon={
                    msg.sender._id !== selectedMessages[index - 1]?.sender._id
                  }
                  prevMessageCreatedAt={selectedMessages[index - 1]?.createdAt}
                />
              );
          })}
      </div>
    </>
  );
}
