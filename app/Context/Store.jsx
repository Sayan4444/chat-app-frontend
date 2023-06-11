"use client";
import { useState, createContext, useContext, useEffect } from "react";

export const Context = createContext();
export const useContextProvider = () => useContext(Context);

export default function Store({ children }) {
  const [sideDrawerActive, setSideDrawerActive] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      if (userData.success === "false") return;
      else setUserData(userData.user);
    })();
  }, []);

  const obj = {
    sideDrawerActive,
    setSideDrawerActive,
    userData,
    setUserData,
  };
  return <Context.Provider value={obj}>{children}</Context.Provider>;
}

async function getUserData() {
  const res = await fetch("/api/auth/me", {
    cache: "no-cache",
  });
  const userData = await res.json();
  return userData;
}
