import Form from "./Form";

const Signin = () => {
  return (
    <>
      <div className='bg-cover h-screen w-screen overflow-hidden bg-[url("/background.jpg")] md:bg-[url("/background.png")]'>
        <div className='bg-white mx-4 mt-12 text-center text-3xl py-4 rounded-xl md:w-[30rem] md:mx-auto'>
          Talk-A-Tive
        </div>
        <div className='bg-white mx-4 mt-4 py-4 rounded-xl md:w-[30rem] md:mx-auto'>
          <Form />
        </div>
      </div>
    </>
  );
};

export default Signin;
