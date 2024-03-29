import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra>
      <Component {...pageProps} />
    </Chakra>
  );
}

function Chakra({ cookies, children }: any) {
  const colorModeManager =
    typeof cookies === "string"
      ? cookieStorageManagerSSR(cookies)
      : localStorageManager;

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
}

export function getServerSideProps({ req }: any) {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
}
