import React from "react";
import Spinner from "../components/Spinner";

export default function Loading() {
  return (
    <>
      <div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
        <Spinner size='w-12 h-12' />
      </div>
    </>
  );
}
