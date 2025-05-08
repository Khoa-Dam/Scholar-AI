import { type Chain } from "viem";

export const educhain: Chain = {
  id: 656476,
  name: "Educhain",
  nativeCurrency: {
    decimals: 18,
    name: "Educhain",
    symbol: "EDU",
  },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "educhain",
      url: "https://edu-chain-testnet.blockscout.com",
    },
  },
  testnet: true,
};
