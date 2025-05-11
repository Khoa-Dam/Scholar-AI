"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter, usePathname } from "next/navigation";

interface UseAuthCheckReturn {
  isConnected: boolean;
  isLoading: boolean;
  address: `0x${string}` | undefined;
  checkAuth: () => Promise<boolean>; // Added function to check auth explicitly
}

type AuthError = {
  message: string;
  code?: string;
};

export const useAuthCheck = (): UseAuthCheckReturn => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to check authentication that can be called explicitly
  const checkAuth = async (): Promise<boolean> => {
    try {
      // Redirect to home page if not connected and not already on home page
      if (!isConnected && pathname !== "/") {
        await router.push("/");
        return false;
      }
      return isConnected;
    } catch (error: unknown) {
      const authError = error as AuthError;
      console.error("Auth check error:", {
        message: authError.message,
        code: authError.code,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [isConnected, router, pathname]);

  return {
    isConnected,
    isLoading,
    address,
    checkAuth, // Expose the checkAuth function
  };
};
