import type { NextPage } from "next";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
//@ts-ignore
import Typical from "react-typical";
import { useWeb3React } from "@web3-react/core";
import Router from "next/router";
import axios from "axios";

const Home: NextPage = () => {
  const { active } = useWeb3React();
  if (active) {
    Router.push("/dashboard");
  }
  return (
    <Layout>
      <div className="flex justify-center mt-36">
        <img className="w-96" src="./images/diamond_logo.svg" />
      </div>
      <div className="text-center font-mono text-2xl mt-8">
        <Typical
          steps={["Submit data. Earn Loot.", 5000]}
          loop={1}
          wrapper="h1"
        />
      </div>
    </Layout>
  );
};

export default Home;
