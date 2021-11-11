import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import NavBar from "../NavBar";
import styles from "../../styles/Layout.module.css";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
  const { active, account, library } = useWeb3React();
  const [balance, setBalance] = useState("");
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (library) {
      library
        .getBalance(account)
        .then(
          (balance: ethers.BigNumberish) =>
            isMounted && setBalance(ethers.utils.formatEther(balance))
        );
    }
    return () => {
      isMounted = false;
    };
  }, [account]);
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
            <div>Balance: {balance} </div>
            <div>Loot Earned: 0.0 </div>
          </div>
        </div>
      )}
    </div>
  );
};
