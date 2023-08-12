import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/router";

export default function ProgressBar() {
  const loadingBarRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      loadingBarRef.current.continuousStart();
    });
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      loadingBarRef.current.complete();
    });
  }, []);

  return (
    <div>
      <LoadingBar color='#f11946' ref={loadingBarRef} />
    </div>
  );
}
