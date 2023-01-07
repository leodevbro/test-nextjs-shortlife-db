import "../styles/globals.css";
import { AppProps } from "next/app";

import { DehydratedState, Hydrate, QueryClientProvider } from "react-query";
import { queryClient } from "../src/gq001/api";

export default function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
