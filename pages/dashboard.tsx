import type { NextPage } from "next";
import React from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { HiUserGroup } from "react-icons/hi";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl text-center mt-24">Select a form below</h1>
      <div className="mt-2 flex justify-evenly flex-wrap">
        <Card link="/forms?name=DAOHaus">
          <>
            <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
              DAOHaus DAO Form
              <HiUserGroup size="5em" />
            </div>
          </>
        </Card>
        <Card link="/forms?name=Snapshot">
          <>
            <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
              Snapshot DAO Form
              <HiUserGroup size="5em" />
            </div>
          </>
        </Card>

        {/* <Card link="/forms?name=Wallet">
          <div className="font-bold text-2xl mb-2 flex flex-col items-center text-white-700">
            Wallet Information
            <IoIosWallet size="5em" />
          </div>
        </Card> */}
      </div>
    </Layout>
  );
};

export default Home;
