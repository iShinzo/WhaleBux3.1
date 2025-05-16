"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, Copy, Share2, Trophy, Coins, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

interface ReferralMilestone {
  id: number
  count: number
  reward: {
    type: "coins" | "tokens" | "boost" | "rate" | "time"
    amount: number
  }
  claimed: boolean
}

interface ReferredUser {
  id: string
  username: string
  joinedAt: string
  level: number
  active: boolean
}

export function ReferralSystem() {
  const { userData } = useUserData()
  const [referralLink, setReferralLink] = useState("https://whalebux.app/ref/test_user")
  const [referralCount, setReferralCount] = useState(3)

  // Mock data for referral milestones
  const [milestones, setMilestones] = useState<ReferralMilestone[]>([
    {
      id: 1,
      count: 1,
      reward: {
        type: "coins",
        amount: 500,
      },
      claimed: true,
    },
    {
      id: 2,
      count: 3,
      reward: {
        type: "boost",
        amount: 10,
      },
      claimed: true,
    },
    {
      id: 3,
      count: 5,
      reward: {
        type: "tokens",
        amount: 0.25,
      },
      claimed: false,
    },
    {
      id: 4,
      count: 10,
      reward: {
        type: "rate",
        amount: 2,
      },
      claimed: false,
    },
    {
      id: 5,
      count: 25,
      reward: {
        type: "tokens",
        amount: 1,
      },
      claimed: false,
    },
  ])

  // Mock data for referred users
  const [referredUsers, setReferredUsers] = useState<ReferredUser[]>([
    {
      id: "user1",
      username: "crypto_fan",
      joinedAt: "2023-05-10",
      level: 3,
      active: true,
    },
    {
      id: "user2",
      username: "token_hunter",
      joinedAt: "2023-05-15",
      level: 2,
      active: true,
    },
    {
      id: "user3",
      username: "blockchain_lover",
      joinedAt: "2023-05-20",
      level: 1,
      active: true,
    },
  ])

  const copyReferralLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        alert("Referral link copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err)
      })
  }

  const claimMilestoneReward = (milestoneId: number) => {
    setMilestones(
      milestones.map((milestone) => (milestone.id === milestoneId ? { ...milestone, claimed: true } : milestone)),
    )
  }

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "coins":
        return <Coins className="h-5 w-5 text-yellow-400" />
      case "tokens":
        return (
          <div className="h-5 w-5 relative">
            <Image
              src="/images/wbux-token.png"
              alt="WhaleBux Token"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
        )
      case "boost":
        return <Trophy className="h-5 w-5 text-purple-400" />
      case "rate":
        return <Trophy className="h-5 w-5 text-green-400" />
      case "time":
        return <Clock className="h-5 w-5 text-blue-400" />
      default:
        return <Coins className="h-5 w-5 text-yellow-400" />
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

  const getNextMilestone = () => {
    const nextMilestone = milestones.find((m) => m.count > referralCount)
    return nextMilestone || milestones[milestones.length - 1]
  }

  const nextMilestone = getNextMilestone()
  const progress = nextMilestone ? (referralCount / nextMilestone.count) * 100 : 100

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Referral Program
          </CardTitle>
          <CardDescription>Invite friends to earn rewards and boost your mining</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Card className="bg-card p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">Your Referral Link</h3>
                  <p className="text-sm text-muted-foreground mb-3">Share this link with friends to earn rewards</p>

                  <div className="flex items-center gap-2">
                    <Input value={referralLink} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={copyReferralLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-2">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <span className="font-medium">{referralCount} Referrals</span>
                  </div>

                  <Button variant="outline" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </div>
            </Card>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Referral Progress</h3>
                {nextMilestone && nextMilestone.count > referralCount && (
                  <span className="text-sm text-muted-foreground">Next milestone: {nextMilestone.count} referrals</span>
                )}
              </div>

              <Progress value={progress} className="h-2 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {milestones.map((milestone) => (
                  <Card
                    key={milestone.id}
                    className={`border ${
                      milestone.claimed
                        ? "border-green-500/50 bg-green-500/5"
                        : milestone.count <= referralCount
                          ? "border-yellow-500/50 bg-yellow-500/5"
                          : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-2">
                          <Badge variant="outline" className="mb-2">
                            {milestone.count} {milestone.count === 1 ? "Referral" : "Referrals"}
                          </Badge>
                        </div>

                        <div className="flex items-center mb-4">
                          {getRewardIcon(milestone.reward.type)}
                          <span className="ml-1 font-medium">
                            {getRewardLabel(milestone.reward.type, milestone.reward.amount)}
                          </span>
                        </div>

                        {milestone.claimed ? (
                          <Badge variant="success" className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Claimed
                          </Badge>
                        ) : milestone.count <= referralCount ? (
                          <Button size="sm" onClick={() => claimMilestoneReward(milestone.id)}>
                            Claim Reward
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            {milestone.count - referralCount} more needed
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Your Referrals</h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                      <TableCell>{user.level}</TableCell>
                      <TableCell>
                        <Badge variant={user.active ? "success" : "secondary"}>
                          {user.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
