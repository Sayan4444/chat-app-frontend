"use client";
import { useState, createContext, useContext } from "react";

export const Context = createContext();
export const useContextProvider = () => useContext(Context);

export default function Store({ children }) {
  const [sideDrawerActive, setSideDrawerActive] = useState(false);

  const obj = {
    sideDrawerActive,
    setSideDrawerActive,
  };
  return <Context.Provider value={obj}>{children}</Context.Provider>;
}
