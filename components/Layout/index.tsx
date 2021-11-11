import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import NavBar from "../NavBar";
import styles from "../../styles/Layout.module.css";
import axios from "axios";
import { useGetScoreboard } from "../../hooks/use-get-scoreboard";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  const { active, account, library } = useWeb3React();
  const [scoreboard, setScoreboard] = useState(0);
  const [displayModal, setDisplayModal] = useState(false);
  const { data, isLoading } = useGetScoreboard();

  useEffect(() => {
    let isMounted = true;
    if (!isLoading) {
      const scoreboardArray = data?.data.map((row: string[]) => row[0]);
      let count = scoreboardArray.reduce(
        (accumlatedCount: number, curVal: string) =>
          accumlatedCount + ((curVal === account) as unknown as number),
        0
      );
      if (isMounted) setScoreboard(count);
    }
    return () => {
      isMounted = false;
    };
  }, [data, isLoading]);

  return (
    <div className="container mx-auto md:px-48 px-12 font-mono">
      <NavBar />
      {children}
      {active && (
        <div
          onClick={() => setDisplayModal(!displayModal)}
          className={`${styles.Modal}`}
        >
          <div className="flex items-center bg-primary-100 hover:bg-primary-200 cursor-pointer px-2 py-2 rounded-t-lg">
            <div className={`${displayModal ? styles.Flip : styles.Origin}`}>
              <IoIosArrowUp size="2em" />{" "}
            </div>
            <span className="ml-4">Wallet Info</span>
          </div>
          <div
            style={{ display: displayModal ? "block" : "none" }}
            className="bg-primary-100 px-2 pb-4"
          >
            <div>Wallet: {account} </div>
            <div>Entries submitted: {scoreboard} </div>
          </div>
        </div>
      )}
    </div>
  );
};
