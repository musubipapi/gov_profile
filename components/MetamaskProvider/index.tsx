import { useWeb3React } from "@web3-react/core";
import React, { FC, useEffect, useState } from "react";
import { WALLET_INJECTED } from "../../typing";
import { injected } from "../../utils/web3";
import { Spinner } from "../Spinner";

interface IMetamaskProvider {
  children: React.ReactElement;
}

export const MetamaskProvider: FC<IMetamaskProvider> = ({ children }) => {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const walletInjected = localStorage.getItem(WALLET_INJECTED);
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError && walletInjected) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);
  if (loaded) {
    return children;
  }
  return <Spinner />;
};

export default MetamaskProvider;
