"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Crown, Zap, Percent, Clock, Users, CheckCircle, Settings, Trophy, Calendar, Coins } from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"
import { useMiningState } from "@/hooks/use-mining-state"

export function UserProfile() {
  const { userData } = useUserData()
  const { actualRate, actualBoost, actualDuration } = useMiningState()
  const [activeTab, setActiveTab] = useState("boosts")

  const getVipBadgeColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getVipName = (level: number) => {
    switch (level) {
      case 1:
        return "Whale Rookie"
      case 2:
        return "Whale Elite"
      case 3:
        return "Whale Legend"
      default:
        return "Free User"
    }
  }

  const formatExpiryDate = (dateString: string | null) => {
    if (!dateString) return "Not active"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userData.avatar || ""} alt={userData.username} />
            <AvatarFallback>{getInitials(userData.username)}</AvatarFallback>
          </Avatar>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>Your account information and active boosts</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center text-center mb-4">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src={userData.avatar || ""} alt={userData.username} />
                <AvatarFallback className="text-xl">{getInitials(userData.username)}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">{userData.username}</h3>
              <p className="text-sm text-muted-foreground">Level {userData.level} Miner</p>

              {userData.vipLevel > 0 && (
                <Badge className={`mt-2 ${getVipBadgeColor(userData.vipLevel)}`}>
                  <Crown className="h-3 w-3 mr-1" />
                  VIP {userData.vipLevel} - {getVipName(userData.vipLevel)}
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">$COINS Balance</div>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{userData.coins.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">$WBUX Balance</div>
                <div className="flex items-center">
                  <div className="h-4 w-4 mr-1 relative">
                    <Image
                      src="/images/wbux-token.png"
                      alt="WhaleBux Token"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium">{userData.tokens.toFixed(4)}</span>
                </div>
              </div>

              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Friend Slots</div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="font-medium">{userData.friendSlots}</span>
                </div>
              </div>

              <div className="bg-card p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Task Slots</div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="font-medium">
                    {userData.activeTasks} / {userData.maxTasks}
                  </span>
                </div>
              </div>

              {userData.vipLevel > 0 && userData.vipExpiryDate && (
                <div className="bg-card p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground">VIP Expires</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{formatExpiryDate(userData.vipExpiryDate)}</span>
                  </div>
                </div>
              )}
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </div>

          <Separator orientation="vertical" className="hidden md:block" />

          <div className="md:w-2/3">
            <Tabs defaultValue="boosts" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="boosts">
                  <Zap className="h-4 w-4 mr-2" />
                  <span>Active Boosts</span>
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span>Achievements</span>
                </TabsTrigger>
                <TabsTrigger value="stats">
                  <Percent className="h-4 w-4 mr-2" />
                  <span>Stats</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="boosts">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mining Boosts</CardTitle>
                    <CardDescription>Your active mining bonuses and upgrades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card p-3 rounded-lg">
                          <div className="text-xs text-muted-foreground">Mining Rate</div>
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 text-primary mr-1" />
                            <span className="font-medium">{actualRate.toFixed(2)}/hr</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {userData.vipLevel > 0 && (
                              <span className="text-green-400">+{userData.vipLevel} from VIP</span>
                            )}
                          </div>
                        </div>

                        <div className="bg-card p-3 rounded-lg">
                          <div className="text-xs text-muted-foreground">Mining Boost</div>
                          <div className="flex items-center">
                            <Percent className="h-4 w-4 text-purple-400 mr-1" />
                            <span className="font-medium">+{actualBoost}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {userData.vipLevel > 0 && (
                              <span className="text-green-400">
                                +{userData.vipLevel === 1 ? 5 : userData.vipLevel === 2 ? 10 : 15}% from VIP
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="bg-card p-3 rounded-lg">
                          <div className="text-xs text-muted-foreground">Mining Time</div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-blue-400 mr-1" />
                            <span className="font-medium">{(actualDuration / 60).toFixed(1)} min</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {userData.vipLevel >= 3 && <span className="text-green-400">-1 hour from VIP</span>}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">VIP Benefits</h4>
                        {userData.vipLevel > 0 ? (
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                              <span className="text-sm">+{userData.vipLevel} Mining Rate</span>
                            </li>

                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                              <span className="text-sm">
                                +{userData.vipLevel === 1 ? 5 : userData.vipLevel === 2 ? 10 : 15}% Mining Boost
                              </span>
                            </li>

                            <li className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                              <span className="text-sm">
                                +{userData.vipLevel === 1 ? 1 : userData.vipLevel === 2 ? 3 : 5} Friend Slots
                              </span>
                            </li>

                            {userData.vipLevel >= 2 && (
                              <li className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                                <span className="text-sm">Auto-Claim Mining Rewards</span>
                              </li>
                            )}

                            {userData.vipLevel >= 3 && (
                              <li className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                                <span className="text-sm">-1 Hour Mining Time</span>
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No VIP benefits active. Purchase VIP to unlock mining boosts and more!
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Achievements</CardTitle>
                    <CardDescription>Your mining milestones and accomplishments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">Achievements coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mining Statistics</CardTitle>
                    <CardDescription>Your mining performance and history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-8">Detailed statistics coming soon!</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
