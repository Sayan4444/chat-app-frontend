"use client";
import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";

export const Context = createContext();
export const useContextProvider = () => useContext(Context);

export default function Store({ children }) {
  const router = useRouter();
  const [sideDrawerActive, setSideDrawerActive] = useState(false);
  const [userData, setUserData] = useState({});

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_url}/api/auth/me`,
        {
          credentials: "include",
        },
        {
          cache: "no-cache",
        }
      );
      const resData = await res.json();
      return resData;
    } catch (error) {
      console.log(error.message);
    }
  };
  const callOnRefresh = async () => {
    const data = await fetchData();
    if (data.success === false) router.push("/signin");
    else {
      if (userData._id === data.user._id) return;
      setUserData(data.user);
    }
  };

  useEffect(() => {
    callOnRefresh();
    console.log(userData);
  }, [userData]);

  const obj = {
    sideDrawerActive,
    setSideDrawerActive,
    userData,
    setUserData,
  };
  return <Context.Provider value={obj}>{children}</Context.Provider>;
}
