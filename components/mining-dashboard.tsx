"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Coins, Clock, Zap, Trophy } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { useMiningState } from "@/hooks/use-mining-state"

export function MiningDashboard() {
  const { userData } = useUserData()
  const {
    miningState,
    startMining,
    claimEarnings,
    calculatePotentialEarnings,
    actualDuration,
    actualRate,
    actualBoost,
  } = useMiningState()

  const currentLevel = userData.level
  const potentialEarnings = Math.floor(calculatePotentialEarnings())

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="grid gap-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 text-primary mr-2" />
            Mining Dashboard
          </CardTitle>
          <CardDescription>Mine $COINS to earn experience and tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-sm">Level {currentLevel}</span>
              </div>
              <div className="flex items-center">
                <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-sm">{userData.coins.toLocaleString()} $COINS</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Experience</span>
                <span>{userData.experience.toLocaleString()}</span>
              </div>
              <Progress value={userData.experience} className="h-2" />
            </div>

            {miningState.miningActive ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mining Progress</span>
                    <span>{formatTime(miningState.timeLeft)}</span>
                  </div>
                  <Progress value={miningState.miningProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Mining Rate</div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-primary mr-1" />
                      <span>{actualRate.toFixed(2)}/hr</span>
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Boost</div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-primary mr-1" />
                      <span>+{actualBoost}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">Mining in progress... Please wait.</div>
              </div>
            ) : miningState.earnings > 0 ? (
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold mb-1">Mining Complete!</div>
                  <div className="flex items-center justify-center text-2xl font-bold">
                    <Coins className="h-6 w-6 text-yellow-400 mr-2 coin-animation" />
                    <span>{miningState.earnings.toLocaleString()} $COINS</span>
                  </div>
                </div>

                <Button onClick={claimEarnings} className="w-full">
                  Claim Earnings
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Duration</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-1" />
                      <span>{(actualDuration / 60).toFixed(1)} min</span>
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Rate</div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-primary mr-1" />
                      <span>{actualRate.toFixed(2)}/hr</span>
                    </div>
                  </div>
                  <div className="bg-card p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Boost</div>
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-primary mr-1" />
                      <span>+{actualBoost}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Potential Earnings</div>
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="font-bold">{potentialEarnings.toLocaleString()} $COINS</span>
                  </div>
                </div>

                <Button onClick={startMining} className="w-full">
                  Start Mining
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
