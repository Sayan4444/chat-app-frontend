import React from "react";
import Spinner from "../components/Spinner";

export default function Loading() {
  return (
    <div className='flex justify-center mt-10'>
      <Spinner size='w-10 h-10 mx-auto' />
    </div>
  );
}
