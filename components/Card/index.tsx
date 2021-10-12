import Link from "next/link";
import React, { FC } from "react";

interface ICard {
  link?: string;
  children: React.ReactElement;
}

export const Card: FC<ICard> = ({ link = "", children }) => {
  return (
    <Link href={link}>
      <div
        style={{ height: "200px", width: "350px" }}
        className="max-w-sm bg-primary-100 cursor-pointer hover:bg-primary-200 rounded overflow-hidden shadow-lg m-4"
      >
        <div className="px-6 py-4">{children}</div>
      </div>
    </Link>
  );
};
