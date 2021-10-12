import { useWeb3React } from "@web3-react/core";
import Router from "next/router";
import { FC } from "react";
import { Spinner } from "../Spinner";

interface IProtectedRoute {
  children: React.ReactElement;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { active } = useWeb3React();
  if (!active && window.location.pathname !== "/") {
    setTimeout(() => {
      Router.push("/");
    }, 2000);
    return (
      <div className="flex items-center flex-col mt-40">
        <Spinner color={"black"} width="100" height="100" />
        <div className="mt-8">
          Wallet not connected... Redirecting to home page
        </div>
      </div>
    );
  }
  return children;
};
