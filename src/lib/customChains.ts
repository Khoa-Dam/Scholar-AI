import { type Chain } from "viem";

export const educhain: Chain = {
  id: 41923,
  name: "Educhain",
  nativeCurrency: {
    decimals: 18,
    name: "Educhain",
    symbol: "EDU",
  },
  rpcUrls: {
    default: { http: ["https://rpc.edu-chain.raas.gelato.cloud"] },
  },
  blockExplorers: {
    default: { name: "educhain", url: "https://educhain.blockscout.com" },
  },
  testnet: true,
};
