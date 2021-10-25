import React from "react";
import Link from "next/link";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/web3";
import { WALLET_INJECTED } from "../../typing";
import { Router, useRouter } from "next/router";

const NavBar = () => {
  const { active, activate, deactivate } = useWeb3React();
  const router = useRouter();
  const login = async (isActive: boolean) => {
    try {
      if (isActive) {
        deactivate();
        localStorage.removeItem(WALLET_INJECTED);
      } else {
        await activate(injected);
        localStorage.setItem(WALLET_INJECTED, "injected");
        router.query?.from && router.push(router.query.from as string);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <Link href="/">
        <a className="font-mono text-2xl">gov.profile</a>
      </Link>
      <div>
        <button
          onClick={() => login(active)}
          className="bg-primary-100 hover:bg-primary-200 font-bold py-2 px-4 rounded cursor-pointer"
        >
          {active ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};
export default NavBar;
