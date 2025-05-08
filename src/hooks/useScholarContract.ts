// src/hooks/useScholarContract.ts
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/config";
import { CONTRACT_ABI } from "@/components/contract/Profile";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ADDRESS_CONTRACT;

export function useScholarContract() {
  const { writeContractAsync } = useWriteContract();
  console.log("🔄 CONTRACT_ADDRESS", CONTRACT_ADDRESS);
  const { address } = useAccount();
  console.log("check account", address);

  const setBasicInfo = async (
    fullname: string,
    email: string,
    phone: string,
    addressDetail: string,
    religion: string,
    dateOfBirth: string,
    sex: string
  ) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "setBasicInfo",
      args: [fullname, email, phone, addressDetail, religion, dateOfBirth, sex],
    });
  };

  const setPassportInfo = async (
    passportCode: string,
    passportExpiry: string,
    nationality: string
  ) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "setPassportInfo",
      args: [passportCode, passportExpiry, nationality],
    });
  };

  const setOtherInfo = async (
    scholarPoint: bigint,
    maritalStatus: string,
    familyInfo: string,
    budgetInfo: string,
    roadmap: string
  ) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "setOtherInfo",
      args: [scholarPoint, maritalStatus, familyInfo, budgetInfo, roadmap],
    });
  };

  // Thêm các hàm mới

  // Thêm điểm cho người dùng
  const addPoints = async (points: number) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "addPoints",
      args: [BigInt(points)],
    });
  };

  // Thêm phần thưởng mới
  const addReward = async (name: string, pointCost: number) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "addReward",
      args: [name, BigInt(pointCost)],
    });
  };

  // Đổi phần thưởng
  const claimReward = async (rewardId: number) => {
    return await writeContractAsync({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "claimReward",
      args: [BigInt(rewardId)],
    });
  };

  // Lấy số lượng phần thưởng
  const getRewardCount = async () => {
    try {
      const count = await readContract(config, {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "rewardCount",
      });
      return count;
    } catch (error) {
      console.error("Error getting reward count:", error);
      return BigInt(0);
    }
  };

  // Lấy thông tin phần thưởng
  const getReward = async (rewardId: number) => {
    try {
      const reward = await readContract(config, {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "rewards",
        args: [BigInt(rewardId)],
      });
      return reward;
    } catch (error) {
      console.error("Error getting reward:", error);
      return null;
    }
  };

  // Lấy điểm Scholar Points từ hàm getMyPoints
  const getMyPoints = async () => {
    try {
      const points = await readContract(config, {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "getMyPoints",
      });
      return points;
    } catch (error) {
      console.error("Error getting points:", error);
      return BigInt(0);
    }
  };

  // Read functions
  const getMyProfile = async (address?: `0x${string}`) => {
    if (!address) return null;

    try {
      return await readContract(config, {
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "getMyProfile",
      });
    } catch (error) {
      console.error("Error getting profile:", error);
      return null;
    }
  };
  // Reactive data
  const { data: profileData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getMyProfile",
    query: { enabled: !!address },
    account: address,
  });
  console.log("🔄 profileData", profileData);

  // Sử dụng useReadContract để lấy số lượng phần thưởng
  const { data: rewardCountData, refetch: refetchRewardCount } =
    useReadContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "rewardCount",
      query: { enabled: !!address },
    });

  // Reactive data
  const { data: pointsData, refetch: refetchPoints } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getMyPoints",
    query: { enabled: !!address },
    account: address,
  });

  return {
    setBasicInfo,
    setPassportInfo,
    setOtherInfo,

    addPoints,
    addReward,
    claimReward,
    getReward,
    getRewardCount,

    getMyProfile,

    profileData,
    refetchProfile: refetch,
    rewardCount: rewardCountData,
    refetchRewardCount,

    getMyPoints,
    pointsData,
    refetchPoints,
  };
}
