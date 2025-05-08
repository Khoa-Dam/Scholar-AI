"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useScholarContract } from "@/hooks/useScholarContract";

type UserData = {
  basicInfo: {
    fullname: string;
    gmail: string;
    phone: string;
    permanentAddress: string;
    religion: string;
    dateOfBirth: string;
    sex: string;
    passportCode: string;
    passportExpiralDate: string;
    nationality: string;
  };
  gridInfo: {
    passport: string;
    maritalStatus: string;
    family: string;
    budget: string;
  };
  roadmap: string;
  scholarPoints: number;
  verifiedDocuments: VerifiedDocument[];
};

type VerifiedDocument = {
  hash: string;
  name: string;
  type: string;
  timestamp: number;
  verifiedBy: string;
  transactionHash: string;
  isVerified: boolean;
};

// Define proper types for the input data
type BasicInfoInput = {
  fullname: string;
  gmail: string;
  phone: string;
  permanentAddress: string;
  religion: string;
  dateOfBirth: string;
  sex: string;
  passportCode: string;
  passportExpiralDate: string;
  nationality: string;
};

type GridInfoInput = {
  passport: string;
  maritalStatus: string;
  family: string;
  budget: string;
};

// Contract profile data structure from the blockchain
interface ContractProfileData {
  fullname?: string;
  email?: string;
  phone?: string;
  addressDetail?: string;
  religion?: string;
  dateOfBirth?: string;
  sex?: string;
  passportCode?: string;
  passportExpiry?: string;
  nationality?: string;
  maritalStatus?: string;
  familyInfo?: string;
  budgetInfo?: string;
  roadmap?: string;
  scholarPoint?: bigint | string | number;
  [key: string]: bigint | string | number | boolean | undefined;
}

type Reward = {
  name: string;
  pointCost: number;
};

type BlockchainContextType = {
  connected: boolean;
  loading: boolean;
  walletAddress: string;
  userData: UserData | null;
  saveBasicInfo: (data: BasicInfoInput) => Promise<void>;
  saveGridInfo: (data: GridInfoInput) => Promise<void>;
  saveRoadmap: (data: string) => Promise<void>;
  saveAllData: (
    basicInfo: BasicInfoInput,
    gridInfo: GridInfoInput,
    roadmap: string
  ) => Promise<void>;
  verifyDocument: (file: File, documentType: string) => Promise<string>;
  checkDocumentVerification: (hash: string) => Promise<VerifiedDocument | null>;
  updateScholarPoints: (points: number) => Promise<void>;
  updateCompleteProfile: (profileData: UserData) => Promise<void>;

  // Thêm các chức năng mới
  addPoints: (points: number) => Promise<void>;
  getAllRewards: () => Promise<Reward[]>;
  claimReward: (rewardId: number) => Promise<void>;
  addReward: (name: string, pointCost: number) => Promise<void>;
};

const BlockchainContext = createContext<BlockchainContextType | undefined>(
  undefined
);

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [verifiedDocuments, setVerifiedDocuments] = useState<
    VerifiedDocument[]
  >([]);

  // Use Wagmi hooks
  const { address, isConnected } = useAccount();
  const {
    profileData,
    refetchProfile,
    setBasicInfo: contractSetBasicInfo,
    setPassportInfo: contractSetPassportInfo,
    setOtherInfo: contractSetOtherInfo,
    addPoints: contractAddPoints,
    claimReward: contractClaimReward,
    getReward,
    getRewardCount,
    addReward: contractAddReward,
    refetchRewardCount,
  } = useScholarContract();

  // Load user data when connected or when profile data changes
  useEffect(() => {
    if (isConnected && address) {
      console.log("🔄 Account connected:", address);
      console.log("📊 Profile data received:", profileData);
      if (profileData) {
        parseProfileData(profileData as ContractProfileData);
      } else {
        console.log("⚠️ No profile data available yet");
      }
    } else if (!isConnected) {
      console.log("🔌 Account disconnected");
      setUserData(null);
    }
  }, [isConnected, address, profileData]);

  // Parse profile data from contract
  const parseProfileData = (data: ContractProfileData) => {
    try {
      const formattedData: UserData = {
        basicInfo: {
          fullname: data.fullname || "",
          gmail: data.email || "",
          phone: data.phone || "",
          permanentAddress: data.addressDetail || "",
          religion: data.religion || "",
          dateOfBirth: data.dateOfBirth || "",
          sex: data.sex || "",
          passportCode: data.passportCode || "",
          passportExpiralDate: data.passportExpiry || "",
          nationality: data.nationality || "",
        },
        gridInfo: {
          passport: data.passportCode || "",
          maritalStatus: data.maritalStatus || "",
          family: data.familyInfo || "",
          budget: data.budgetInfo || "",
        },
        roadmap: data.roadmap || "",
        scholarPoints: Number(data.scholarPoint || 0),
        verifiedDocuments: [],
      };

      setUserData(formattedData);
    } catch (error) {
      console.error("Error parsing profile data:", error);
      toast.error("Failed to parse profile data from the blockchain");
      setUserData({
        basicInfo: {
          fullname: "",
          gmail: "",
          phone: "",
          permanentAddress: "",
          religion: "",
          dateOfBirth: "",
          sex: "",
          passportCode: "",
          passportExpiralDate: "",
          nationality: "",
        },
        gridInfo: {
          passport: "",
          maritalStatus: "",
          family: "",
          budget: "",
        },
        roadmap: "",
        scholarPoints: 0,
        verifiedDocuments: [],
      });
    }
  };

  const saveBasicInfo = async (data: BasicInfoInput) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    console.log("💼 Saving basic info:", data);
    setLoading(true);
    try {
      const tx = await contractSetBasicInfo(
        data.fullname || "",
        data.gmail || "",
        data.phone || "",
        data.permanentAddress || "",
        data.religion || "",
        data.dateOfBirth || "",
        data.sex || ""
      );
      console.log("✅ Basic info transaction hash:", tx);

      // Update passport info if provided
      if (data.passportCode || data.passportExpiralDate || data.nationality) {
        const passportTx = await contractSetPassportInfo(
          data.passportCode || "",
          data.passportExpiralDate || "",
          data.nationality || ""
        );
        console.log("✅ Passport info transaction hash:", passportTx);
      }

      // Refresh the profile data
      console.log("🔄 Refreshing profile data...");
      await refetchProfile();
      console.log("📝 After refetch, profile data:", profileData);
      toast.success("Basic information saved to blockchain");
    } catch (error) {
      console.error("❌ Error saving basic info:", error);
      toast.error("Failed to save information to blockchain");
    } finally {
      setLoading(false);
    }
  };

  const saveGridInfo = async (data: GridInfoInput) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // We need to get the current scholarPoint and roadmap to maintain them
      const currentData = userData || { scholarPoints: 0, roadmap: "" };

      // Use contractSetOtherInfo from the hook instead of writeContractAsync directly
      await contractSetOtherInfo(
        BigInt(currentData.scholarPoints),
        data.maritalStatus || "",
        data.family || "",
        data.budget || "",
        currentData.roadmap || ""
      );

      // Refresh the profile data
      await refetchProfile();

      toast.success("Information saved to blockchain");
    } catch (error) {
      console.error("Error saving grid info:", error);
      toast.error("Failed to save information to blockchain");
    } finally {
      setLoading(false);
    }
  };

  const saveRoadmap = async (data: string) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // We need to get the current data to maintain other fields
      const currentData = userData || {
        scholarPoints: 0,
        gridInfo: { maritalStatus: "", family: "", budget: "" },
      };

      // Use contractSetOtherInfo from the hook
      await contractSetOtherInfo(
        BigInt(currentData.scholarPoints),
        currentData.gridInfo.maritalStatus || "",
        currentData.gridInfo.family || "",
        currentData.gridInfo.budget || "",
        data || ""
      );

      // Refresh the profile data
      await refetchProfile();

      toast.success("Roadmap saved to blockchain");
    } catch (error) {
      console.error("Error saving roadmap:", error);
      toast.error("Failed to save roadmap to blockchain");
    } finally {
      setLoading(false);
    }
  };

  const saveAllData = async (
    basicInfo: BasicInfoInput,
    gridInfo: GridInfoInput,
    roadmap: string
  ) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // Save basic info
      await contractSetBasicInfo(
        basicInfo.fullname || "",
        basicInfo.gmail || "",
        basicInfo.phone || "",
        basicInfo.permanentAddress || "",
        basicInfo.religion || "",
        basicInfo.dateOfBirth || "",
        basicInfo.sex || ""
      );

      // Save passport info
      await contractSetPassportInfo(
        basicInfo.passportCode || "",
        basicInfo.passportExpiralDate || "",
        basicInfo.nationality || ""
      );

      // Save other info
      await contractSetOtherInfo(
        BigInt(userData?.scholarPoints || 0),
        gridInfo.maritalStatus || "",
        gridInfo.family || "",
        gridInfo.budget || "",
        roadmap || ""
      );

      // Refresh the profile data
      await refetchProfile();

      toast.success("All information saved to blockchain");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save information to blockchain");
    } finally {
      setLoading(false);
    }
  };

  // Function to compute SHA-256 hash of a file
  const computeFileHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex =
            "0x" +
            hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
          resolve(hashHex);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to verify a document on the blockchain
  // Note: This is a mock implementation since the contract doesn't have document verification yet
  const verifyDocument = async (
    file: File,
    documentType: string
  ): Promise<string> => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      throw new Error("Wallet not connected");
    }

    setLoading(true);
    try {
      // Compute the hash of the file
      const documentHash = await computeFileHash(file);

      // For demo purposes, we'll simulate the blockchain verification
      // In a real implementation, you would need to add document verification to your contract
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate blockchain delay

      // Create a mock transaction hash
      const mockTxHash =
        "0x" +
        Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("");

      // Add the verified document to the user data
      const newVerifiedDoc: VerifiedDocument = {
        hash: documentHash,
        name: file.name,
        type: documentType,
        timestamp: Date.now(),
        verifiedBy: address,
        transactionHash: mockTxHash,
        isVerified: true,
      };

      // Update verified documents
      const updatedDocs = [...verifiedDocuments, newVerifiedDoc];
      setVerifiedDocuments(updatedDocs);

      // Update user data with new verified documents
      if (userData) {
        setUserData({
          ...userData,
          verifiedDocuments: updatedDocs,
        });
      }

      toast.success(`${file.name} has been verified on the blockchain`);

      return documentHash;
    } catch (error) {
      console.error("Error verifying document:", error);
      toast.error("Failed to verify document on the blockchain");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to check if a document is verified
  // Note: This is a mock implementation since the contract doesn't have document verification yet
  const checkDocumentVerification = async (
    hash: string
  ): Promise<VerifiedDocument | null> => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return null;
    }

    try {
      // For demo purposes, we'll check our local state
      // In a real implementation, you would need to add document verification to your contract
      const verifiedDoc =
        verifiedDocuments.find((doc) => doc.hash === hash) || null;
      return verifiedDoc;
    } catch (error) {
      console.error("Error checking document verification:", error);
      toast.error("Failed to check document verification");
      return null;
    }
  };

  // Add function to update Scholar Points
  const updateScholarPoints = async (points: number) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // Get current data to maintain other fields
      const currentData = userData || {
        gridInfo: { maritalStatus: "", family: "", budget: "" },
        roadmap: "",
      };

      // Use contractSetOtherInfo from the hook
      await contractSetOtherInfo(
        BigInt(points),
        currentData.gridInfo.maritalStatus || "",
        currentData.gridInfo.family || "",
        currentData.gridInfo.budget || "",
        currentData.roadmap || ""
      );

      // Refresh profile data
      await refetchProfile();

      toast.success("Scholar points updated successfully");
    } catch (error) {
      console.error("Error updating scholar points:", error);
      toast.error("Failed to update scholar points");
    } finally {
      setLoading(false);
    }
  };

  // Add function to update the complete profile at once
  const updateCompleteProfile = async (profileData: UserData) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // Update basic info
      await contractSetBasicInfo(
        profileData.basicInfo.fullname || "",
        profileData.basicInfo.gmail || "",
        profileData.basicInfo.phone || "",
        profileData.basicInfo.permanentAddress || "",
        profileData.basicInfo.religion || "",
        profileData.basicInfo.dateOfBirth || "",
        profileData.basicInfo.sex || ""
      );

      // Update passport info
      await contractSetPassportInfo(
        profileData.basicInfo.passportCode || "",
        profileData.basicInfo.passportExpiralDate || "",
        profileData.basicInfo.nationality || ""
      );

      // Update other info
      await contractSetOtherInfo(
        BigInt(profileData.scholarPoints),
        profileData.gridInfo.maritalStatus || "",
        profileData.gridInfo.family || "",
        profileData.gridInfo.budget || "",
        profileData.roadmap || ""
      );

      await refetchProfile();

      toast.success("Complete profile updated successfully");
    } catch (error) {
      console.error("Error updating complete profile:", error);
      toast.error("Failed to update complete profile");
    } finally {
      setLoading(false);
    }
  };

  // Thêm điểm Scholar (sử dụng addPoints mới)
  const addPoints = async (points: number) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // Sử dụng hàm addPoints mới từ contract
      await contractAddPoints(points);
      toast.success(`Đã thêm ${points} điểm thành công!`);

      // Refresh profile data
      await refetchProfile();
    } catch (error) {
      console.error("Error adding points:", error);
      toast.error("Failed to add points");
    } finally {
      setLoading(false);
    }
  };

  // Lấy tất cả phần thưởng
  const getAllRewards = async (): Promise<Reward[]> => {
    try {
      const count = await getRewardCount();
      const rewards: Reward[] = [];

      // Chuyển BigInt sang number để dễ dàng quản lý trong JS
      const countNumber = Number(count);

      for (let i = 1; i <= countNumber; i++) {
        const reward = await getReward(i);
        if (reward) {
          rewards.push({
            name: reward[0],
            pointCost: Number(reward[1]),
          });
        }
      }

      return rewards;
    } catch (error) {
      console.error("Error getting rewards:", error);
      return [];
    }
  };

  // Đổi phần thưởng
  const claimRewardFunc = async (rewardId: number) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      await contractClaimReward(rewardId);
      toast.success("Đổi phần thưởng thành công!");

      // Refresh profile data để cập nhật điểm
      await refetchProfile();
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Failed to claim reward");
    } finally {
      setLoading(false);
    }
  };

  // Thêm phần thưởng
  const addRewardFunc = async (name: string, pointCost: number) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      await contractAddReward(name, pointCost);
      toast.success("Phần thưởng mới đã được thêm thành công!");

      // Refresh reward count
      await refetchRewardCount();
    } catch (error) {
      console.error("Error adding reward:", error);
      toast.error("Failed to add reward");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        connected: isConnected,
        loading: loading || !!profileData,
        walletAddress: address || "",
        userData,
        saveBasicInfo,
        saveGridInfo,
        saveRoadmap,
        saveAllData,
        verifyDocument,
        checkDocumentVerification,
        updateScholarPoints,
        updateCompleteProfile,

        // Thêm các chức năng mới
        addPoints,
        getAllRewards,
        claimReward: claimRewardFunc,
        addReward: addRewardFunc,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider");
  }
  return context;
};
