"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Gift, Check, Coins, Trophy, Clock, Zap } from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

interface DayReward {
  day: number
  type: "coins" | "tokens" | "boost" | "rate" | "time"
  amount: number
  claimed: boolean
  special: boolean
}

export function DailyLogin() {
  const { userData, updateUserData } = useUserData()
  const [showDialog, setShowDialog] = useState(false)
  const [currentDay, setCurrentDay] = useState(0)
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null)
  const [rewardClaimed, setRewardClaimed] = useState(false)

  // Generate calendar rewards
  const [calendarRewards, setCalendarRewards] = useState<DayReward[]>(() => {
    const rewards: DayReward[] = []

    for (let i = 1; i <= 28; i++) {
      let reward: DayReward = {
        day: i,
        type: "coins",
        amount: 50 + i * 10,
        claimed: false,
        special: false,
      }

      // Special rewards for every 7th day
      if (i % 7 === 0) {
        reward = {
          day: i,
          type: i === 7 ? "boost" : i === 14 ? "rate" : i === 21 ? "time" : "tokens",
          amount: i === 28 ? 0.5 : i === 7 ? 10 : i === 14 ? 1 : 15,
          claimed: false,
          special: true,
        }
      }

      rewards.push(reward)
    }

    return rewards
  })

  // Load login data from localStorage
  useEffect(() => {
    const savedLoginData = localStorage.getItem("whalebux-login-data")
    if (savedLoginData) {
      try {
        const data = JSON.parse(savedLoginData)
        setCurrentDay(data.currentDay)
        setLastLoginDate(data.lastLoginDate)
        setCalendarRewards(data.calendarRewards)
        setRewardClaimed(data.rewardClaimed || false)
      } catch (error) {
        console.error("Failed to parse saved login data:", error)
      }
    }

    // Check if it's a new day
    checkDailyLogin()
  }, [])

  // Save login data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "whalebux-login-data",
      JSON.stringify({
        currentDay,
        lastLoginDate,
        calendarRewards,
        rewardClaimed,
      }),
    )
  }, [currentDay, lastLoginDate, calendarRewards, rewardClaimed])

  const checkDailyLogin = () => {
    const today = new Date().toDateString()

    if (lastLoginDate !== today) {
      // It's a new day
      setLastLoginDate(today)
      setRewardClaimed(false)

      // If the user has logged in before, increment the day counter
      if (lastLoginDate) {
        const lastDate = new Date(lastLoginDate)
        const todayDate = new Date(today)

        // Check if it's consecutive (within 1 day)
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays <= 1) {
          // Consecutive login
          setCurrentDay((prev) => Math.min(prev + 1, 28))
        } else {
          // Streak broken
          setCurrentDay(1)

          // Reset claimed status
          setCalendarRewards((prev) => prev.map((reward) => ({ ...reward, claimed: false })))
        }
      } else {
        // First login
        setCurrentDay(1)
      }

      // Show the dialog
      setShowDialog(true)
    }
  }

  const claimReward = () => {
    if (rewardClaimed || currentDay === 0) return

    const reward = calendarRewards[currentDay - 1]
    if (!reward) return

    // Update reward claimed status
    setCalendarRewards((prev) => prev.map((r, i) => (i === currentDay - 1 ? { ...r, claimed: true } : r)))

    // Update user data based on reward
    const updates: any = {}

    if (reward.type === "coins") {
      updates.coins = userData.coins + reward.amount
    } else if (reward.type === "tokens") {
      updates.tokens = userData.tokens + reward.amount
    } else if (reward.type === "boost") {
      updates.boostUpgradeLevel = userData.boostUpgradeLevel + 1
    } else if (reward.type === "rate") {
      updates.rateUpgradeLevel = userData.rateUpgradeLevel + 1
    } else if (reward.type === "time") {
      updates.timeUpgradeLevel = userData.timeUpgradeLevel + 1
    }

    updateUserData(updates)
    setRewardClaimed(true)
  }

  const getRewardIcon = (type: string, size = 5) => {
    switch (type) {
      case "coins":
        return <Coins className={`h-${size} w-${size} text-yellow-400`} />
      case "tokens":
        return (
          <div className={`h-${size} w-${size} relative`}>
            <Image
              src="/images/wbux-token.png"
              alt="WhaleBux Token"
              width={size * 4}
              height={size * 4}
              className="object-contain"
            />
          </div>
        )
      case "boost":
        return <Trophy className={`h-${size} w-${size} text-purple-400`} />
      case "rate":
        return <Zap className={`h-${size} w-${size} text-green-400`} />
      case "time":
        return <Clock className={`h-${size} w-${size} text-blue-400`} />
      default:
        return <Coins className={`h-${size} w-${size} text-yellow-400`} />
    }
  }

  const getRewardLabel = (type: string, amount: number) => {
    switch (type) {
      case "coins":
        return `${amount} $COINS`
      case "tokens":
        return `${amount} $WBUX`
      case "boost":
        return `+${amount}% Boost`
      case "rate":
        return `+${amount} Mining Rate`
      case "time":
        return `-${amount}min Mining Time`
      default:
        return `${amount}`
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Daily Login
          </CardTitle>
          <CardDescription>Log in daily to earn rewards and build your streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Current Streak: Day {currentDay}</h3>
                <p className="text-sm text-muted-foreground">Keep logging in daily to earn better rewards!</p>
              </div>

              <Button onClick={() => setShowDialog(true)} variant="outline" className="flex items-center">
                <Gift className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>

            {currentDay > 0 && !rewardClaimed && (
              <Card className="border-yellow-500/50 bg-yellow-500/5">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="font-medium">Day {currentDay} Reward Available!</h4>
                      <p className="text-sm text-muted-foreground">Claim your daily login reward</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {getRewardIcon(calendarRewards[currentDay - 1].type)}
                        <span className="ml-1 font-medium">
                          {getRewardLabel(calendarRewards[currentDay - 1].type, calendarRewards[currentDay - 1].amount)}
                        </span>
                      </div>

                      <Button onClick={claimReward}>
                        <Gift className="h-4 w-4 mr-2" />
                        Claim
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <h4 className="text-sm font-medium mb-2">Day 7</h4>
                <div className="flex justify-center mb-1">{getRewardIcon("boost", 6)}</div>
                <p className="text-sm">+10% Boost</p>
              </Card>

              <Card className="p-4 text-center">
                <h4 className="text-sm font-medium mb-2">Day 14</h4>
                <div className="flex justify-center mb-1">{getRewardIcon("rate", 6)}</div>
                <p className="text-sm">+1 Mining Rate</p>
              </Card>

              <Card className="p-4 text-center">
                <h4 className="text-sm font-medium mb-2">Day 21</h4>
                <div className="flex justify-center mb-1">{getRewardIcon("time", 6)}</div>
                <p className="text-sm">-15min Mining Time</p>
              </Card>

              <Card className="p-4 text-center">
                <h4 className="text-sm font-medium mb-2">Day 28</h4>
                <div className="flex justify-center mb-1">{getRewardIcon("tokens", 6)}</div>
                <p className="text-sm">0.5 $WBUX</p>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Daily Login Calendar</DialogTitle>
            <DialogDescription>
              Log in daily to earn rewards and build your streak. Every 7 days you'll receive a special reward!
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-7 gap-2">
            {calendarRewards.map((reward) => (
              <Card
                key={reward.day}
                className={`p-2 text-center ${reward.special ? "border-yellow-500/50" : ""} ${
                  reward.claimed ? "bg-green-500/10 border-green-500/50" : ""
                } ${reward.day === currentDay && !reward.claimed ? "bg-blue-500/10 border-blue-500/50" : ""} ${
                  reward.day > currentDay ? "opacity-50" : ""
                }`}
              >
                <div className="text-xs font-medium mb-1">Day {reward.day}</div>
                <div className="flex justify-center mb-1">{getRewardIcon(reward.type, 4)}</div>
                <div className="text-xs truncate">{getRewardLabel(reward.type, reward.amount)}</div>
                {reward.claimed && (
                  <div className="mt-1 flex justify-center">
                    <Check className="h-3 w-3 text-green-500" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm font-medium">Current Streak: Day {currentDay}</p>
              {lastLoginDate && (
                <p className="text-xs text-muted-foreground">
                  Last login: {new Date(lastLoginDate).toLocaleDateString()}
                </p>
              )}
            </div>

            {currentDay > 0 && !rewardClaimed && (
              <Button
                onClick={() => {
                  claimReward()
                  setShowDialog(false)
                }}
              >
                <Gift className="h-4 w-4 mr-2" />
                Claim Day {currentDay} Reward
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
