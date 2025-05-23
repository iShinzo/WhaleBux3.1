"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Coins, Calendar, Star, Users, ArrowUp, ArrowDown } from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

interface LeaderboardUser {
  id: string
  username: string
  rank: number
  value: number
  change?: "up" | "down" | "same"
  isCurrentUser?: boolean
}

export function Leaderboard() {
  const { userData } = useUserData()
  const [activeTab, setActiveTab] = useState("coins")
  const [timeframe, setTimeframe] = useState("all")

  // Mock data for leaderboards
  const coinsLeaderboard: LeaderboardUser[] = [
    { id: "user1", username: "whale_master", rank: 1, value: 1250000, change: "up" },
    { id: "user2", username: "crypto_hunter", rank: 2, value: 980000, change: "same" },
    { id: "user3", username: "token_collector", rank: 3, value: 750000, change: "up" },
    { id: "user4", username: "mining_pro", rank: 4, value: 620000, change: "down" },
    { id: "user5", username: "blockchain_lover", rank: 5, value: 580000, change: "up" },
    { id: "user6", username: "test_user", rank: 6, value: userData.coins, change: "up", isCurrentUser: true },
    { id: "user7", username: "crypto_fan", rank: 7, value: 320000, change: "down" },
    { id: "user8", username: "token_hunter", rank: 8, value: 280000, change: "same" },
    { id: "user9", username: "mining_master", rank: 9, value: 250000, change: "down" },
    { id: "user10", username: "whale_hunter", rank: 10, value: 220000, change: "up" },
  ]

  const tokensLeaderboard: LeaderboardUser[] = [
    { id: "user2", username: "crypto_hunter", rank: 1, value: 125.5, change: "up" },
    { id: "user1", username: "whale_master", rank: 2, value: 98.75, change: "down" },
    { id: "user5", username: "blockchain_lover", rank: 3, value: 75.25, change: "up" },
    { id: "user3", username: "token_collector", rank: 4, value: 62.8, change: "same" },
    { id: "user4", username: "mining_pro", rank: 5, value: 58.4, change: "down" },
    { id: "user8", username: "token_hunter", rank: 6, value: 45.2, change: "up" },
    { id: "user6", username: "test_user", rank: 7, value: userData.tokens, change: "up", isCurrentUser: true },
    { id: "user7", username: "crypto_fan", rank: 8, value: 28.6, change: "down" },
    { id: "user9", username: "mining_master", rank: 9, value: 25.3, change: "same" },
    { id: "user10", username: "whale_hunter", rank: 10, value: 22.1, change: "up" },
  ]

  const levelsLeaderboard: LeaderboardUser[] = [
    { id: "user3", username: "token_collector", rank: 1, value: 9, change: "same" },
    { id: "user1", username: "whale_master", rank: 2, value: 8, change: "up" },
    { id: "user2", username: "crypto_hunter", rank: 3, value: 7, change: "down" },
    { id: "user9", username: "mining_master", rank: 4, value: 6, change: "up" },
    { id: "user4", username: "mining_pro", rank: 5, value: 5, change: "same" },
    { id: "user5", username: "blockchain_lover", rank: 6, value: 4, change: "down" },
    { id: "user7", username: "crypto_fan", rank: 7, value: 3, change: "up" },
    { id: "user6", username: "test_user", rank: 8, value: userData.level, change: "up", isCurrentUser: true },
    { id: "user8", username: "token_hunter", rank: 9, value: 2, change: "down" },
    { id: "user10", username: "whale_hunter", rank: 10, value: 1, change: "same" },
  ]

  const streaksLeaderboard: LeaderboardUser[] = [
    { id: "user9", username: "mining_master", rank: 1, value: 28, change: "same" },
    { id: "user5", username: "blockchain_lover", rank: 2, value: 24, change: "up" },
    { id: "user1", username: "whale_master", rank: 3, value: 21, change: "up" },
    { id: "user3", username: "token_collector", rank: 4, value: 18, change: "down" },
    { id: "user2", username: "crypto_hunter", rank: 5, value: 15, change: "same" },
    { id: "user7", username: "crypto_fan", rank: 6, value: 12, change: "up" },
    { id: "user4", username: "mining_pro", rank: 7, value: 10, change: "down" },
    { id: "user6", username: "test_user", rank: 8, value: 7, change: "up", isCurrentUser: true },
    { id: "user8", username: "token_hunter", rank: 9, value: 5, change: "down" },
    { id: "user10", username: "whale_hunter", rank: 10, value: 3, change: "same" },
  ]

  const referralsLeaderboard: LeaderboardUser[] = [
    { id: "user1", username: "whale_master", rank: 1, value: 42, change: "up" },
    { id: "user2", username: "crypto_hunter", rank: 2, value: 38, change: "same" },
    { id: "user5", username: "blockchain_lover", rank: 3, value: 27, change: "up" },
    { id: "user3", username: "token_collector", rank: 4, value: 23, change: "down" },
    { id: "user9", username: "mining_master", rank: 5, value: 19, change: "up" },
    { id: "user4", username: "mining_pro", rank: 6, value: 15, change: "down" },
    { id: "user7", username: "crypto_fan", rank: 7, value: 12, change: "same" },
    { id: "user8", username: "token_hunter", rank: 8, value: 8, change: "up" },
    { id: "user6", username: "test_user", rank: 9, value: 3, change: "up", isCurrentUser: true },
    { id: "user10", username: "whale_hunter", rank: 10, value: 1, change: "down" },
  ]

  const getActiveLeaderboard = () => {
    switch (activeTab) {
      case "coins":
        return coinsLeaderboard
      case "tokens":
        return tokensLeaderboard
      case "levels":
        return levelsLeaderboard
      case "streaks":
        return streaksLeaderboard
      case "referrals":
        return referralsLeaderboard
      default:
        return coinsLeaderboard
    }
  }

  const getValueLabel = (tab: string, value: number) => {
    switch (tab) {
      case "coins":
        return `${value.toLocaleString()} $COINS`
      case "tokens":
        return `${value.toFixed(2)} $WBUX`
      case "levels":
        return `Level ${value}`
      case "streaks":
        return `${value} days`
      case "referrals":
        return `${value} referrals`
      default:
        return value.toString()
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "coins":
        return <Coins className="h-4 w-4 mr-2" />
      case "tokens":
        return (
          <div className="h-4 w-4 mr-2 relative">
            <Image
              src="/images/wbux-token.png"
              alt="WhaleBux Token"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        )
      case "levels":
        return <Trophy className="h-4 w-4 mr-2" />
      case "streaks":
        return <Calendar className="h-4 w-4 mr-2" />
      case "referrals":
        return <Users className="h-4 w-4 mr-2" />
      default:
        return <Star className="h-4 w-4 mr-2" />
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Badge className="bg-yellow-500">🥇 1st</Badge>
    } else if (rank === 2) {
      return <Badge className="bg-gray-400">🥈 2nd</Badge>
    } else if (rank === 3) {
      return <Badge className="bg-amber-700">🥉 3rd</Badge>
    } else {
      return <Badge variant="outline">{rank}th</Badge>
    }
  }

  const getChangeIcon = (change?: "up" | "down" | "same") => {
    switch (change) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Leaderboards
          </CardTitle>
          <CardDescription>See how you rank against other miners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="coins" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="coins" className="flex items-center">
                  <Coins className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Coins</span>
                </TabsTrigger>
                <TabsTrigger value="tokens" className="flex items-center">
                  <div className="h-4 w-4 mr-2 relative">
                    <Image
                      src="/images/wbux-token.png"
                      alt="WhaleBux Token"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  <span className="hidden sm:inline">Tokens</span>
                </TabsTrigger>
                <TabsTrigger value="levels" className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Levels</span>
                </TabsTrigger>
                <TabsTrigger value="streaks" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Streaks</span>
                </TabsTrigger>
                <TabsTrigger value="referrals" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Referrals</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center">
              {getTabIcon(activeTab)}
              <span>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Leaderboard</span>
            </h3>

            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="daily">Today</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</TableHead>
                <TableHead className="w-[80px] text-center">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getActiveLeaderboard().map((user) => (
                <TableRow key={user.id} className={user.isCurrentUser ? "bg-primary/5" : ""}>
                  <TableCell>{getRankBadge(user.rank)}</TableCell>
                  <TableCell className="font-medium">
                    {user.username}
                    {user.isCurrentUser && <span className="ml-2 text-primary">(You)</span>}
                  </TableCell>
                  <TableCell className="text-right font-medium">{getValueLabel(activeTab, user.value)}</TableCell>
                  <TableCell className="text-center">{getChangeIcon(user.change)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            {activeTab === "coins" && "Top miners by total $COINS earned"}
            {activeTab === "tokens" && "Top miners by $WBUX token balance"}
            {activeTab === "levels" && "Top miners by level achieved"}
            {activeTab === "streaks" && "Top miners by consecutive daily login streaks"}
            {activeTab === "referrals" && "Top miners by number of successful referrals"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
