import Form from "./components/Form";

const Signin = () => {
  return (
    <>
      <div className=' h-screen w-screen overflow-hidden '>
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
