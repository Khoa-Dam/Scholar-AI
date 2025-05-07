import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { educhain } from "./customChains";

export const config = createConfig(
  getDefaultConfig({
    appName: "ConnectKit",
    chains: [educhain],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
