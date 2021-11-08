import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const getLibrary = (
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
) => {
  return new ethers.providers.Web3Provider(provider);
};
