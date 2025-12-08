// Shared rewards history for profile and rewards page

export interface RedeemedReward {
  id: string;
  rewardId: number;
  rewardTitle: string;
  rewardTitleEn: string;
  coins: number;
  timestamp: number;
  category: string;
  categoryEn: string;
  icon: string;
}

const STORAGE_KEY = "redeemedRewards";

export function getRedeemedRewards(): RedeemedReward[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRedeemedReward(reward: Omit<RedeemedReward, "id" | "timestamp">): void {
  const redeemed = getRedeemedRewards();
  const newReward: RedeemedReward = {
    ...reward,
    id: `reward_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  
  redeemed.unshift(newReward); // Add to beginning
  localStorage.setItem(STORAGE_KEY, JSON.stringify(redeemed));
  
  // Add negative activity to activity history to subtract coins
  const userActivities = JSON.parse(localStorage.getItem("userActivities") || "[]");
  const negativeActivity = {
    id: `redeem_${Date.now()}`,
    action: `Eingelöst: ${reward.rewardTitle}`,
    actionEn: `Redeemed: ${reward.rewardTitleEn}`,
    coins: -reward.coins, // Negative coins to subtract from total
    date: new Date().toLocaleDateString("de-DE"),
    timestamp: Date.now(),
    type: "reward" as const,
  };
  
  userActivities.unshift(negativeActivity);
  localStorage.setItem("userActivities", JSON.stringify(userActivities));
  
  // Trigger custom event to update ActivityContext
  window.dispatchEvent(new CustomEvent("activitiesUpdated"));
}

export function getTotalRedeemedCoins(): number {
  const redeemed = getRedeemedRewards();
  return redeemed.reduce((sum, r) => sum + r.coins, 0);
}

export function getRewardRedemptionCount(rewardId: number): number {
  const redeemed = getRedeemedRewards();
  return redeemed.filter(r => r.rewardId === rewardId).length;
}