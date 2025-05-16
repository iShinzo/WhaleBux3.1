"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Zap, Clock, TrendingUp, Coins, Lock } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { MINING_RATE_UPGRADES, MINING_BOOST_UPGRADES, MINING_TIME_UPGRADES } from "@/lib/config"
import Image from "next/image"

export function UpgradesPanel() {
  const { userData, updateUserData } = useUserData()
  const [activeTab, setActiveTab] = useState("rate")

  const purchaseUpgrade = (type: string, level: number, costCoins: number, costTokens: number) => {
    // Check if user has enough currency
    if (costCoins > 0 && userData.coins < costCoins) return
    if (costTokens > 0 && userData.tokens < costTokens) return

    // Update user data based on upgrade type
    const updates: any = {
      coins: userData.coins - costCoins,
      tokens: userData.tokens - costTokens,
    }

    if (type === "rate") {
      updates.rateUpgradeLevel = level
    } else if (type === "boost") {
      updates.boostUpgradeLevel = level
    } else if (type === "time") {
      updates.timeUpgradeLevel = level
    }

    updateUserData(updates)
  }

  const renderUpgradeCard = (
    type: string,
    level: number,
    bonus: number | string,
    costCoins: number,
    costTokens: number,
    currentLevel: number,
    bonusLabel: string,
  ) => {
    const isOwned = currentLevel >= level
    const isNextLevel = currentLevel + 1 === level
    const isLocked = currentLevel + 1 < level

    return (
      <Card
        className={`border ${isOwned ? "border-primary/50 bg-primary/5" : isNextLevel ? "border-yellow-500/50" : "border-muted"}`}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-base flex items-center">
            {type === "rate" && <Zap className="h-4 w-4 mr-2" />}
            {type === "boost" && <TrendingUp className="h-4 w-4 mr-2" />}
            {type === "time" && <Clock className="h-4 w-4 mr-2" />}
            Level {level}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-sm mb-2">
            <span className="text-muted-foreground">Bonus: </span>
            <span className="font-medium">
              {bonus} {bonusLabel}
            </span>
          </div>

          <div className="flex justify-between items-center mt-4">
            {isOwned ? (
              <Button variant="outline" className="w-full" disabled>
                Owned
              </Button>
            ) : isLocked ? (
              <Button variant="outline" className="w-full" disabled>
                <Lock className="h-3 w-3 mr-2" />
                Locked
              </Button>
            ) : (
              <Button
                variant={costTokens > 0 ? "outline" : "default"}
                className="w-full"
                onClick={() => purchaseUpgrade(type, level, costCoins, costTokens)}
                disabled={
                  (costCoins > 0 && userData.coins < costCoins) || (costTokens > 0 && userData.tokens < costTokens)
                }
              >
                {costCoins > 0 ? (
                  <div className="flex items-center">
                    <Coins className="h-3 w-3 mr-1" />
                    <span>{costCoins}</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-3 w-3 mr-1 relative">
                      <Image
                        src="/images/wbux-token.png"
                        alt="WhaleBux Token"
                        width={12}
                        height={12}
                        className="object-contain"
                      />
                    </div>
                    <span>{costTokens}</span>
                  </div>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upgrades</CardTitle>
          <CardDescription>Improve your mining efficiency with upgrades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6 bg-card p-3 rounded-lg">
            <div className="flex items-center">
              <Coins className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="font-bold">{userData.coins.toLocaleString()}</span>
              <span className="text-xs ml-1 text-muted-foreground">$COINS</span>
            </div>
            <Separator orientation="vertical" className="h-6 mx-4" />
            <div className="flex items-center">
              <div className="h-5 w-5 mr-2 relative">
                <Image
                  src="/images/wbux-token.png"
                  alt="WhaleBux Token"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <span className="font-bold">{userData.tokens.toFixed(4)}</span>
              <span className="text-xs ml-1 text-muted-foreground">$WBUX</span>
            </div>
          </div>

          <Tabs defaultValue="rate" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="rate" className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                <span>Mining Rate</span>
              </TabsTrigger>
              <TabsTrigger value="boost" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Mining Boost</span>
              </TabsTrigger>
              <TabsTrigger value="time" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Mining Time</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="rate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MINING_RATE_UPGRADES.map((upgrade) =>
                  renderUpgradeCard(
                    "rate",
                    upgrade.level,
                    `+${upgrade.bonus}`,
                    upgrade.cost,
                    upgrade.tokenCost,
                    userData.rateUpgradeLevel,
                    "WBUX/hr",
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="boost">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MINING_BOOST_UPGRADES.map((upgrade) =>
                  renderUpgradeCard(
                    "boost",
                    upgrade.level,
                    `+${upgrade.bonus}%`,
                    upgrade.cost,
                    upgrade.tokenCost,
                    userData.boostUpgradeLevel,
                    "",
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="time">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MINING_TIME_UPGRADES.map((upgrade) =>
                  renderUpgradeCard(
                    "time",
                    upgrade.level,
                    `-${upgrade.bonus}`,
                    upgrade.cost,
                    upgrade.tokenCost,
                    userData.timeUpgradeLevel,
                    "min",
                  ),
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
