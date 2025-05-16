"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Trophy, Zap, Clock, TrendingUp, Coins } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { LEVEL_CONFIG } from "@/lib/config"
import Image from "next/image"

export function StatsPanel() {
  const { userData } = useUserData()
  const currentLevel = userData.level
  const levelConfig = LEVEL_CONFIG[currentLevel]
  const nextLevelConfig = LEVEL_CONFIG[currentLevel + 1] || levelConfig

  // Calculate mining stats
  const baseDuration = levelConfig.miningDuration * 60
  const timeReduction = userData.timeUpgradeLevel * 30
  const actualDuration = Math.max(baseDuration - timeReduction, 30) // Minimum 30 minutes

  const baseRate = levelConfig.baseRate
  const rateBonus = userData.rateUpgradeLevel * 1
  const actualRate = baseRate + rateBonus

  const baseBoost = levelConfig.boost
  const boostBonus = userData.boostUpgradeLevel * 5
  const actualBoost = baseBoost + boostBonus

  // Calculate potential earnings
  const potentialEarnings = actualRate * (actualDuration / 60) * (1 + actualBoost / 100)

  // Calculate progress to next level
  const currentXP = userData.experience
  const minXP = levelConfig.xpMin
  const maxXP = levelConfig.xpMax
  const progress = ((currentXP - minXP) / (maxXP - minXP)) * 100

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Your mining stats and progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="font-medium">Level {currentLevel}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {Math.floor(maxXP - currentXP).toLocaleString()} XP needed for Level {currentLevel + 1}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Mining Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Mining Rate</span>
                  </div>
                  <span className="font-medium">{actualRate.toFixed(2)}/hr</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Mining Boost</span>
                  </div>
                  <span className="font-medium">+{actualBoost}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Mining Duration</span>
                  </div>
                  <span className="font-medium">{(actualDuration / 60).toFixed(1)} hrs</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="text-sm">Potential Earnings</span>
                  </div>
                  <span className="font-medium">{Math.floor(potentialEarnings).toLocaleString()} $COINS</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Upgrade Levels</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Mining Rate Upgrade</span>
                  </div>
                  <span className="font-medium">Level {userData.rateUpgradeLevel}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Mining Boost Upgrade</span>
                  </div>
                  <span className="font-medium">Level {userData.boostUpgradeLevel}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Mining Time Upgrade</span>
                  </div>
                  <span className="font-medium">Level {userData.timeUpgradeLevel}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Currency Balance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg">
                <div className="flex items-center mb-1">
                  <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-sm font-medium">$COINS</span>
                </div>
                <div className="text-2xl font-bold">{userData.coins.toLocaleString()}</div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <div className="flex items-center mb-1">
                  <div className="h-5 w-5 mr-2 relative">
                    <Image
                      src="/images/wbux-token.png"
                      alt="WhaleBux Token"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">$WBUX</span>
                </div>
                <div className="text-2xl font-bold">{userData.tokens.toFixed(4)}</div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Next Level Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Base Rate</div>
                <div className="flex items-center justify-between">
                  <span>{baseRate.toFixed(2)}/hr</span>
                  <span className="text-primary">→</span>
                  <span>{nextLevelConfig.baseRate.toFixed(2)}/hr</span>
                </div>
              </div>

              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Base Boost</div>
                <div className="flex items-center justify-between">
                  <span>+{baseBoost}%</span>
                  <span className="text-primary">→</span>
                  <span>+{nextLevelConfig.boost}%</span>
                </div>
              </div>

              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Mining Duration</div>
                <div className="flex items-center justify-between">
                  <span>{levelConfig.miningDuration} hrs</span>
                  <span className="text-primary">→</span>
                  <span>{nextLevelConfig.miningDuration} hrs</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
