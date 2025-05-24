"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Crown,
  Zap,
  Clock,
  Users,
  Gift,
  Percent,
  CheckCircle,
  AlertCircle,
  Coins,
  ShieldCheck,
  Star,
} from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

// Using default export instead of named export
export default function VipMembership() {
  const { userData, updateUserData } = useUserData()
  const [activeTab, setActiveTab] = useState("benefits")
  const [paymentToken, setPaymentToken] = useState("wbux")
  const [confirmVipLevel, setConfirmVipLevel] = useState<number | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const vipPlans = [
    {
      level: 1,
      name: "Whale Rookie",
      color: "green",
      duration: 30,
      price: {
        wbux: 1,
        dogswap: 80,
        token1000x: 0.35,
      },
      benefits: [
        { icon: <Zap className="h-4 w-4 text-primary" />, text: "+1 Mining Rate" },
        { icon: <Percent className="h-4 w-4 text-purple-400" />, text: "+5% Mining Boost" },
        { icon: <Users className="h-4 w-4 text-blue-400" />, text: "+1 Extra Friend Slot" },
        { icon: <Gift className="h-4 w-4 text-yellow-400" />, text: "Daily Login Bonus: +100 $COINS" },
        { icon: <Percent className="h-4 w-4 text-green-400" />, text: "5% off Referral Task Fees" },
        { icon: <CheckCircle className="h-4 w-4 text-green-400" />, text: "2 Task Slots in Catalog" },
      ],
    },
    {
      level: 2,
      name: "Whale Elite",
      color: "yellow",
      duration: 30,
      price: {
        wbux: 5,
        dogswap: 150,
        token1000x: 0.7,
      },
      benefits: [
        { icon: <Zap className="h-4 w-4 text-primary" />, text: "+2 Mining Rate" },
        { icon: <Percent className="h-4 w-4 text-purple-400" />, text: "+10% Mining Boost" },
        { icon: <Users className="h-4 w-4 text-blue-400" />, text: "+3 Extra Friend Slots" },
        { icon: <Gift className="h-4 w-4 text-yellow-400" />, text: "Daily Login Bonus: +300 $COINS" },
        { icon: <Percent className="h-4 w-4 text-green-400" />, text: "10% off Referral Task Fees" },
        { icon: <CheckCircle className="h-4 w-4 text-green-400" />, text: "3 Task Slots in Catalog" },
        { icon: <Coins className="h-4 w-4 text-yellow-400" />, text: "Double Referral Reward Earnings" },
        { icon: <CheckCircle className="h-4 w-4 text-blue-400" />, text: "Auto-Claim Mining Rewards" },
      ],
    },
    {
      level: 3,
      name: "Whale Legend",
      color: "red",
      duration: 30,
      price: {
        wbux: 20,
        dogswap: 200,
        token1000x: 1,
      },
      benefits: [
        { icon: <Zap className="h-4 w-4 text-primary" />, text: "+3 Mining Rate" },
        { icon: <Percent className="h-4 w-4 text-purple-400" />, text: "+15% Mining Boost" },
        { icon: <Clock className="h-4 w-4 text-blue-400" />, text: "-1 Hour Mining Time" },
        { icon: <Users className="h-4 w-4 text-blue-400" />, text: "+5 Extra Friend Slots" },
        { icon: <Gift className="h-4 w-4 text-yellow-400" />, text: "Daily Login Bonus: +600 $COINS" },
        { icon: <Percent className="h-4 w-4 text-green-400" />, text: "20% off Referral Task Fees" },
        { icon: <CheckCircle className="h-4 w-4 text-green-400" />, text: "5 Task Slots in Catalog" },
        { icon: <Coins className="h-4 w-4 text-yellow-400" />, text: "Double Referral Reward Earnings" },
        { icon: <CheckCircle className="h-4 w-4 text-blue-400" />, text: "Auto-Claim Mining Rewards" },
        { icon: <Star className="h-4 w-4 text-yellow-400" />, text: "Access to Exclusive VIP-Only Tasks" },
      ],
    },
  ]

  const getVipBadgeColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-500 hover:bg-green-600"
      case 2:
        return "bg-yellow-500 hover:bg-yellow-600"
      case 3:
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getTokenIcon = (token: string) => {
    switch (token) {
      case "wbux":
        return (
          <div className="h-4 w-4 relative">
            <Image
              src="/images/wbux-token.png"
              alt="WhaleBux Token"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        )
      case "dogswap":
        return <span className="text-sm">🐶</span>
      case "token1000x":
        return <span className="text-sm">💯X</span>
      default:
        return <Coins className="h-4 w-4" />
    }
  }

  const getTokenName = (token: string) => {
    switch (token) {
      case "wbux":
        return "$WBUX"
      case "dogswap":
        return "DogSwap"
      case "token1000x":
        return "1000X Token"
      default:
        return token
    }
  }

  const handlePurchaseVip = (level: number) => {
    setConfirmVipLevel(level)
    setShowConfirmDialog(true)
  }

  const confirmPurchase = () => {
    if (confirmVipLevel === null) return

    const vipPlan = vipPlans.find((plan) => plan.level === confirmVipLevel)
    if (!vipPlan) return

    // Calculate expiry date (30 days from now)
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + vipPlan.duration)

    // Deduct tokens based on selected payment method
    const tokenCost = vipPlan.price[paymentToken as keyof typeof vipPlan.price]

    // In a real app, you would verify the user has enough tokens
    // For demo purposes, we'll just update the VIP status

    updateUserData({
      vipLevel: confirmVipLevel,
      vipExpiryDate: expiryDate.toISOString(),
      // In a real app, you would also deduct the tokens:
      // tokens: userData.tokens - tokenCost
    })

    setShowConfirmDialog(false)
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

  const getDaysRemaining = (dateString: string | null) => {
    if (!dateString) return 0

    const expiryDate = new Date(dateString)
    const now = new Date()

    const diffTime = expiryDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.max(0, diffDays)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="h-5 w-5 mr-2 text-yellow-400" />
            VIP Membership
          </CardTitle>
          <CardDescription>Upgrade your mining experience with exclusive VIP benefits</CardDescription>
        </CardHeader>
        <CardContent>
          {userData.vipLevel > 0 && (
            <Card className="mb-6 border-yellow-500/50 bg-yellow-500/5">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge className={`${getVipBadgeColor(userData.vipLevel)} mr-2`}>
                        <Crown className="h-3 w-3 mr-1" />
                        VIP {userData.vipLevel}
                      </Badge>
                      <h3 className="font-medium">{vipPlans.find((plan) => plan.level === userData.vipLevel)?.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires: {formatExpiryDate(userData.vipExpiryDate)} ({getDaysRemaining(userData.vipExpiryDate)}{" "}
                      days remaining)
                    </p>
                  </div>

                  <Button variant="outline" className="flex items-center">
                    <Crown className="h-4 w-4 mr-2 text-yellow-400" />
                    Extend Membership
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="benefits" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="benefits">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Benefits</span>
              </TabsTrigger>
              <TabsTrigger value="purchase">
                <Crown className="h-4 w-4 mr-2" />
                <span>Purchase VIP</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="benefits">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vipPlans.map((plan) => (
                  <Card key={plan.level} className={`border-${plan.color}-500/50`}>
                    <CardHeader className="pb-2">
                      <Badge className={getVipBadgeColor(plan.level)}>
                        <Crown className="h-3 w-3 mr-1" />
                        Level {plan.level}
                      </Badge>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>{plan.duration} Days Membership</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <ul className="space-y-2">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mt-0.5 mr-2">{benefit.icon}</div>
                            <span className="text-sm">{benefit.text}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={userData.vipLevel === plan.level ? "outline" : "default"}
                        className="w-full"
                        disabled={userData.vipLevel === plan.level}
                        onClick={() => setActiveTab("purchase")}
                      >
                        {userData.vipLevel === plan.level ? "Current Plan" : "Get VIP"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Alert>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>VIP Benefits Stack</AlertTitle>
                  <AlertDescription>
                    Higher VIP levels include all benefits from lower levels. Your VIP status applies across all devices
                    and platforms.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="purchase">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Select Payment Method</h3>
                <Select value={paymentToken} onValueChange={setPaymentToken}>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wbux" className="flex items-center">
                      <div className="flex items-center">
                        <div className="h-4 w-4 mr-2 relative">
                          <Image
                            src="/images/wbux-token.png"
                            alt="WhaleBux Token"
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </div>
                        <span>Pay with $WBUX</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dogswap">
                      <div className="flex items-center">
                        <span className="mr-2">🐶</span>
                        <span>Pay with DogSwap</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="token1000x">
                      <div className="flex items-center">
                        <span className="mr-2">💯</span>
                        <span>Pay with 1000X Token</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vipPlans.map((plan) => (
                  <Card key={plan.level} className={`border-${plan.color}-500/50`}>
                    <CardHeader className="pb-2">
                      <Badge className={getVipBadgeColor(plan.level)}>
                        <Crown className="h-3 w-3 mr-1" />
                        Level {plan.level}
                      </Badge>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>{plan.duration} Days Membership</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-2xl font-bold mb-2 flex items-center">
                        {getTokenIcon(paymentToken)}
                        <span className="ml-1">
                          {plan.price[paymentToken as keyof typeof plan.price]} {getTokenName(paymentToken)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        Includes {plan.benefits.length} premium benefits
                      </p>

                      <ul className="space-y-1">
                        {plan.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mt-0.5 mr-2">{benefit.icon}</div>
                            <span className="text-sm">{benefit.text}</span>
                          </li>
                        ))}
                        {plan.benefits.length > 3 && (
                          <li className="text-sm text-muted-foreground">+{plan.benefits.length - 3} more benefits</li>
                        )}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={userData.vipLevel === plan.level ? "outline" : "default"}
                        className="w-full"
                        disabled={userData.vipLevel === plan.level}
                        onClick={() => handlePurchaseVip(plan.level)}
                      >
                        {userData.vipLevel === plan.level ? "Current Plan" : "Purchase"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    VIP memberships are active for {vipPlans[0].duration} days from purchase. You can extend your
                    membership at any time.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm VIP Purchase</DialogTitle>
            <DialogDescription>You are about to purchase VIP Level {confirmVipLevel} membership.</DialogDescription>
          </DialogHeader>

          {confirmVipLevel !== null && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Membership:</span>
                  <span className="font-medium">{vipPlans.find((plan) => plan.level === confirmVipLevel)?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{vipPlans.find((plan) => plan.level === confirmVipLevel)?.duration} days</span>
                </div>

                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium flex items-center">
                    {getTokenIcon(paymentToken)}
                    <span className="ml-1">
                      {
                        vipPlans.find((plan) => plan.level === confirmVipLevel)?.price[
                          paymentToken as keyof typeof plan.price
                        ]
                      }
                      {getTokenName(paymentToken)}
                    </span>
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span>Your balance:</span>
                  <span className="font-medium flex items-center">
                    {getTokenIcon(paymentToken)}
                    <span className="ml-1">
                      {paymentToken === "wbux" ? userData.tokens.toFixed(2) : "1000.00"} {getTokenName(paymentToken)}
                    </span>
                  </span>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmPurchase}>Confirm Purchase</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
