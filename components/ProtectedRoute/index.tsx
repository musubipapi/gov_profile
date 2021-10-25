import { useWeb3React } from "@web3-react/core";
import router, { useRouter } from "next/router";
import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { Spinner } from "../Spinner";

interface IProtectedRoute {
  children: React.ReactElement;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { active } = useWeb3React();
  const routerPath = Router.pathname;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  useEffect(() => {
    if (active) {
      setIsLoading(false);
    }
  }, [active]);

  if (isLoading) {
    return (
      <div className="flex items-center flex-col mt-40">
        <Spinner color={"black"} width="100" height="100" />
        <div className="mt-8">Loading</div>
      </div>
    );
  } else if (!active && !isLoading && window.location.pathname !== "/") {
    Router.push({
      pathname: "/",
      ...(routerPath !== "/" && { query: { from: routerPath } }),
    });
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
