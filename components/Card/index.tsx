import React, { FC } from "react";

interface ICard {
  children: React.ReactElement;
}

export const Card: FC<ICard> = ({ children }) => {
  return (
    <div
      style={{ height: "200px", width: "350px" }}
      className="max-w-sm bg-purple-500 hover:bg-purple-700 rounded overflow-hidden shadow-lg m-4"
    >
      <div className="px-6 py-4">{children}</div>
    </div>
  );
};
