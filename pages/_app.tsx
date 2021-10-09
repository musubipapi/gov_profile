import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils/web3";
import MetamaskProvider from "../components/MetamaskProvider";
import { ProtectedRoute } from "../components/ProtectedRoute";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </MetamaskProvider>
    </Web3ReactProvider>
  );
}
export default MyApp;
