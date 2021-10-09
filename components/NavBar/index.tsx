import React from "react";
import Link from "next/link";

import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/web3";
import { WALLET_INJECTED } from "../../typing";

const NavBar = () => {
  const { active, activate, deactivate } = useWeb3React();

  const login = async (isActive: boolean) => {
    try {
      if (isActive) {
        deactivate();
        localStorage.removeItem(WALLET_INJECTED);
      } else {
        await activate(injected);
        localStorage.setItem(WALLET_INJECTED, "injected");
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
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          {active ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};
export default NavBar;
