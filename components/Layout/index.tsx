import React, { FC } from "react";
import NavBar from "../NavBar";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className="container mx-auto px-24 font-mono">
      <NavBar />
      {children}
    </div>
  );
};
