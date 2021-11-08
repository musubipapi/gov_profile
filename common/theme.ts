import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: {
      "100": "#FFF5E6",
      "200": "#C1B7A8",
    },
  },
});
