import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { HiUserGroup } from "react-icons/hi";
import { IoIosWallet, IoIosArrowUp } from "react-icons/io";
import styles from "../styles/Dashboard.module.css";
import Link from "next/link";
const Home: NextPage = () => {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState("");
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    library
      .getBalance(account)
      .then((balance: ethers.utils.BigNumberish) =>
        setBalance(ethers.utils.formatEther(balance))
      );
  }, [account]);
  return (
    <Layout>
      <h1 className="text-3xl text-center mt-24">Select a form below</h1>
      <div className="mt-2 flex justify-evenly flex-wrap">
        <>
          <Card link="/forms/dao">
            <>
              <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
                DAO Information
                <HiUserGroup size="5em" />
              </div>
            </>
          </Card>
        </>
        <Card link="/forms/wallet">
          <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
            Wallet Information
            <IoIosWallet size="5em" />
          </div>
        </Card>
      </div>
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
    </Layout>
  );
};

export default Home;
