import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";

const WalletForm: NextPage = () => {
  const { account, library } = useWeb3React();

  return <Layout>WalletForm</Layout>;
};

export default WalletForm;
