"use client";

import { useState } from "react";
import { useBlockchain } from "@/components/blockchain/BlockchainContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddReward() {
  const [rewardName, setRewardName] = useState("");
  const [pointCost, setPointCost] = useState("");
  const [loading, setLoading] = useState(false);

  const { addReward } = useBlockchain();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rewardName.trim()) {
      toast.error("Vui lòng nhập tên phần thưởng");
      return;
    }

    if (
      !pointCost.trim() ||
      isNaN(Number(pointCost)) ||
      Number(pointCost) <= 0
    ) {
      toast.error("Vui lòng nhập số điểm hợp lệ");
      return;
    }

    setLoading(true);
    try {
      await addReward(rewardName, Number(pointCost));
      toast.success("Thêm phần thưởng thành công");

      // Reset form
      setRewardName("");
      setPointCost("");
    } catch (error) {
      console.error("Error adding reward:", error);
      toast.error("Lỗi khi thêm phần thưởng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-lg font-medium mb-2">Thêm phần thưởng mới</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rewardName">Tên phần thưởng</Label>
          <Input
            id="rewardName"
            placeholder="Nhập tên phần thưởng"
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pointCost">Số điểm cần thiết</Label>
          <Input
            id="pointCost"
            type="number"
            placeholder="Nhập số điểm"
            value={pointCost}
            onChange={(e) => setPointCost(e.target.value)}
            min="1"
            disabled={loading}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="px-4 py-2">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang thêm...
            </>
          ) : (
            "Thêm phần thưởng"
          )}
        </Button>
      </div>
    </form>
  );
}
