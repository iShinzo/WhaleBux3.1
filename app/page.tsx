"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Coins, Zap, ArrowUpCircle, Wallet, CheckCircle2, CalendarIcon, Users, Share2, Trophy } from "lucide-react"
import Image from "next/image"
import { MatrixRain } from "@/components/matrix-rain"
import { LoadingScreen } from "@/components/loading-screen"
import { MiningDashboard } from "@/components/mining-dashboard"
import { UpgradesPanel } from "@/components/upgrades-panel"
import { WalletPanel } from "@/components/wallet-panel"
import { StatsPanel } from "@/components/stats-panel"
import { useUserData } from "@/hooks/use-user-data"
import TasksPanel from "@/components/tasks-panel"
import { DailyLogin } from "@/components/daily-login"
import { ReferralSystem } from "@/components/referral-system"
import { ReferralMarket } from "@/components/referral-market"
import Leaderboard from "@/components/leaderboard"
import AuthPage from "./auth/page"
import { UserProfile } from "@/components/user-profile"
import VipMembership from "@/components/vip-membership"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { userData } = useUserData()

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("wbux_logged_in") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  // Listen for login event from AuthPage via sessionStorage
  useEffect(() => {
    const handleStorage = () => {
      const loggedIn = sessionStorage.getItem("wbux_logged_in") === "true"
      if (loggedIn) {
        setIsLoggedIn(true)
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 3000)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  if (!isLoggedIn) {
    return <AuthPage />
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen p-4 md:p-6 relative overflow-hidden">
      <MatrixRain />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-10 w-10 mr-2 whale-animation relative">
              <Image
                src="/images/wbux-token.png"
                alt="WhaleBux Token"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold">WhaleBux Mining</h1>
          </div>

          <div className="flex items-center space-x-2 bg-card p-2 rounded-lg">
            <div className="flex items-center mr-4">
              <Coins className="h-5 w-5 text-yellow-400 mr-1" />
              <span className="font-bold">{userData.coins.toLocaleString()}</span>
              <span className="text-xs ml-1 text-muted-foreground">$COINS</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center">
              <div className="h-5 w-5 mr-1 relative">
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
            {/* User Profile Button */}
            <UserProfile />
          </div>
        </header>

        <Tabs defaultValue="mining" className="w-full">
          <TabsList className="grid grid-cols-9 mb-6">
            <TabsTrigger value="mining" className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Mining</span>
            </TabsTrigger>
            <TabsTrigger value="upgrades" className="flex items-center">
              <ArrowUpCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Upgrades</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="daily" className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Daily</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Market</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="vip" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">VIP</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mining">
            <MiningDashboard />
          </TabsContent>

          <TabsContent value="upgrades">
            <UpgradesPanel />
          </TabsContent>

          <TabsContent value="wallet">
            <WalletPanel />
          </TabsContent>

          <TabsContent value="stats">
            <StatsPanel />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksPanel />
          </TabsContent>

          <TabsContent value="daily">
            <DailyLogin />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSystem />
          </TabsContent>

          <TabsContent value="market">
            <ReferralMarket />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="vip">
            <VipMembership />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
