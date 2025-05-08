"use client";

import { useState, useEffect } from "react";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Gift, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type Reward = {
  id: number;
  name: string;
  pointCost: number;
};

export default function RewardList() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const { getAllRewards, claimReward, userData } = useBlockchain();

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    setLoading(true);
    try {
      const rewardsData = await getAllRewards();
      // Thêm id cho mỗi phần thưởng
      const rewardsWithId = rewardsData.map((reward, index) => ({
        ...reward,
        id: index + 1,
      }));
      setRewards(rewardsWithId);
    } catch (error) {
      console.error("Error loading rewards:", error);
      toast.error("Không thể tải danh sách phần thưởng");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async (rewardId: number) => {
    if (!userData) {
      toast.error("Vui lòng kết nối ví của bạn");
      return;
    }

    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    if (userData.scholarPoints < reward.pointCost) {
      toast.error("Không đủ điểm để đổi phần thưởng này");
      return;
    }

    setClaimingId(rewardId);
    try {
      await claimReward(rewardId);
      toast.success(`Đã đổi thành công: ${reward.name}`);
    } catch (error) {
      console.error("Error claiming reward:", error);
      toast.error("Không thể đổi phần thưởng. Vui lòng thử lại.");
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm sm:text-base">
          Đang tải phần thưởng...
        </span>
      </div>
    );
  }

  if (rewards.length === 0) {
    return (
      <div className="text-center p-4 sm:p-8 border rounded-md">
        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">
          Hiện tại không có phần thưởng nào.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {rewards.map((reward) => (
        <Card key={reward.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">
              {reward.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {reward.pointCost} Scholar Points
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pb-2 text-sm sm:text-base">
            <p>Đổi phần thưởng này để nhận {reward.name}.</p>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full text-xs sm:text-sm h-9"
              onClick={() => handleClaimReward(reward.id)}
              disabled={
                claimingId === reward.id ||
                (userData?.scholarPoints || 0) < reward.pointCost
              }
            >
              {claimingId === reward.id ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (userData?.scholarPoints || 0) >= reward.pointCost ? (
                <>
                  <Gift className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Đổi ngay
                </>
              ) : (
                <>
                  <Check className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  Chưa đủ điểm
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
