import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../common/web3";
import MetamaskProvider from "../components/MetamaskProvider";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { SWRConfig } from "swr";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../common/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <MetamaskProvider>
          <ProtectedRoute>
            <SWRConfig
              value={{
                fetcher: (url) => axios.get(url).then((res) => res.data),
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </ProtectedRoute>
        </MetamaskProvider>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}
export default MyApp;
