import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { HiUserGroup } from "react-icons/hi";
import { IoIosWallet } from "react-icons/io";

const Home: NextPage = () => {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState("");
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
        <Card>
          <>
            <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
              DAO Information
              <HiUserGroup size="5em" />
            </div>
          </>
        </Card>
        <Card>
          <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
            Wallet Information
            <IoIosWallet size="5em" />
          </div>
        </Card>
      </div>
      <div
        style={{ bottom: "1rem" }}
        className="absolute bg-purple-700 mt-48 max-w-lg px-2 py-3 rounded"
      >
        <h1 className="text-xl mb-4">Your Profile Info: </h1>
        <div>Wallet: {account} </div>
        <div>Balance: {balance} </div>
        <div>Loot Earned: 0.0 </div>
      </div>
    </Layout>
  );
};

export default Home;
