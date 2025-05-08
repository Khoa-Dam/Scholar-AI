"use client";

import { useState } from "react";
import RewardList from "@/components/point/RewardList";
import AddReward from "@/components/point/AddReward";

export default function RewardsPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Quản lý phần thưởng</h1>
        {/* <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant="outline"
          className="w-full sm:w-auto text-sm sm:text-base flex items-center"
          size="sm"
        >
          {showAddForm ? (
            <>
              <XCircle className="mr-2 h-4 w-4" />
              Ẩn form thêm mới
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm phần thưởng mới
            </>
          )}
        </Button> */}
      </div>

      {showAddForm && (
        <div className="mb-6 p-3 sm:p-6 border rounded-lg bg-slate-50">
          <AddReward />
        </div>
      )}

      <RewardList />
    </div>
  );
}
