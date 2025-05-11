"use client";

import { useAuthCheck } from "../hooks/useAuthCheck";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { ConnectKitButton } from "connectkit";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isConnected, isLoading, checkAuth } = useAuthCheck();
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthorized = await checkAuth();
      if (!isAuthorized) {
        router.push("/");
      }
      setIsChecked(true);
    };

    verifyAuth();
  }, [checkAuth, router]);

  if (isLoading || !isChecked) {
    return <Loading />;
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Please Connect Your Wallet
          </h1>
          <p className="text-gray-600 mb-4">
            You need to connect your wallet to continue pursuing your dreams
          </p>
        </div>
        <ConnectKitButton />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
