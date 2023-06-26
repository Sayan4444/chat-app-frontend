import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import runningMan from "../animations/running-man.json";
import loadingBlueDot from "../animations/loading-blue-dot.json";

export default function Loading() {
  const runningManRef = useRef(null);
  const loadingBlueDotRef = useRef(null);

  useEffect(() => {
    const runningManAnimation = lottie.loadAnimation({
      container: runningManRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: runningMan,
    });

    const loadingBlueDotAnimation = lottie.loadAnimation({
      container: loadingBlueDotRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingBlueDot,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
        width: 300,
        height: 200,
      },
    });
    return () => {
      runningManAnimation.destroy();
      loadingBlueDotAnimation.destroy();
    };
  }, []);
  return (
    <>
      <div className='w-screen h-screen p-10'>
        <div className='bg-white w-full h-full rounded-2xl relative'>
          <div className='absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
            <div ref={runningManRef} className='h-80 w-80' />
            <div className='text-4xl w-full relative mt-16'>
              <span>Your messages are loading</span>
              <div
                ref={loadingBlueDotRef}
                className='absolute -right-60 -top-[75px]'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
