"use client";
import { ConnectKitButton } from "connectkit";
import { useBlockchain } from "./BlockchainContext";
import { Loader2 } from "lucide-react";

const WalletConnect = () => {
  const { loading } = useBlockchain();

  return (
    <div>
      {loading ? (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Processing...</span>
        </div>
      ) : (
        <ConnectKitButton />
      )}
    </div>
  );
};

export default WalletConnect;
