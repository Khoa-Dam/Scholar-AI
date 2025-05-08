"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/lib/config";
import { ConnectKitProvider } from "connectkit";
import { BlockchainProvider } from "@/components/blockchain/BlockchainContext";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
export function Providers(props: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BlockchainProvider>
          <ConnectKitProvider theme="retro">
            {props.children}
            <Toaster position="top-right" />
          </ConnectKitProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
