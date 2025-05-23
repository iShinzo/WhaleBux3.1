"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Share2, Link, ExternalLink, Plus, Coins, Check, X } from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

interface ReferralOffer {
  id: string
  creator: string
  title: string
  description: string
  type: string
  reward: number
  link: string
  status: "active" | "completed" | "expired"
}

export function ReferralMarket() {
  const { userData, updateUserData } = useUserData()
  const [activeTab, setActiveTab] = useState("browse")
  const [offerType, setOfferType] = useState("airdrop")
  const [offerTitle, setOfferTitle] = useState("")
  const [offerDescription, setOfferDescription] = useState("")
  const [offerReward, setOfferReward] = useState("")
  const [offerLink, setOfferLink] = useState("")

  // Mock data for referral offers
  const [referralOffers, setReferralOffers] = useState<ReferralOffer[]>([
    {
      id: "offer1",
      creator: "whale_master",
      title: "Join Telegram Group for Airdrop",
      description: "Join our Telegram group and stay for at least 3 days to qualify for the upcoming airdrop.",
      type: "telegram",
      reward: 500,
      link: "https://t.me/whalebux",
      status: "active",
    },
    {
      id: "offer2",
      creator: "crypto_hunter",
      title: "Follow Twitter and Retweet",
      description: "Follow our Twitter account and retweet our pinned post about the new token launch.",
      type: "twitter",
      reward: 350,
      link: "https://twitter.com/whalebux",
      status: "active",
    },
    {
      id: "offer3",
      creator: "token_collector",
      title: "Join Discord Server",
      description: "Join our Discord server and verify your account to get access to exclusive mining tips.",
      type: "discord",
      reward: 400,
      link: "https://discord.gg/whalebux",
      status: "active",
    },
  ])

  const [myOffers, setMyOffers] = useState<ReferralOffer[]>([
    {
      id: "myoffer1",
      creator: "test_user",
      title: "Join My NFT Community",
      description: "Join my NFT community on Discord and get early access to upcoming drops.",
      type: "discord",
      reward: 300,
      link: "https://discord.gg/mynft",
      status: "active",
    },
  ])

  const [myTasks, setMyTasks] = useState<ReferralOffer[]>([
    {
      id: "task1",
      creator: "whale_master",
      title: "Join Telegram Group for Airdrop",
      description: "Join our Telegram group and stay for at least 3 days to qualify for the upcoming airdrop.",
      type: "telegram",
      reward: 500,
      link: "https://t.me/whalebux",
      status: "completed",
    },
  ])

  const createOffer = () => {
    if (!offerTitle || !offerDescription || !offerReward || !offerLink) return

    const newOffer: ReferralOffer = {
      id: `offer${Date.now()}`,
      creator: "test_user",
      title: offerTitle,
      description: offerDescription,
      type: offerType,
      reward: Number(offerReward),
      link: offerLink,
      status: "active",
    }

    setMyOffers([newOffer, ...myOffers])

    // Reset form
    setOfferTitle("")
    setOfferDescription("")
    setOfferReward("")
    setOfferLink("")
    setOfferType("airdrop")

    // Switch to My Offers tab
    setActiveTab("myoffers")
  }

  const acceptOffer = (offerId: string) => {
    const offer = referralOffers.find((o) => o.id === offerId)
    if (!offer) return

    // Add to my tasks
    setMyTasks([{ ...offer, status: "active" }, ...myTasks])

    // Remove from available offers
    setReferralOffers(referralOffers.filter((o) => o.id !== offerId))
  }

  const completeTask = (taskId: string) => {
    const task = myTasks.find((t) => t.id === taskId)
    if (!task || task.status === "completed") return

    // Update task status
    setMyTasks(myTasks.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t)))

    // Add reward to user's balance
    updateUserData({
      coins: userData.coins + task.reward,
    })
  }

  const cancelTask = (taskId: string) => {
    const task = myTasks.find((t) => t.id === taskId)
    if (!task || task.status === "completed") return

    // Remove from my tasks
    setMyTasks(myTasks.filter((t) => t.id !== taskId))

    // Add back to available offers if it wasn't our own offer
    if (!myOffers.some((o) => o.id === taskId)) {
      setReferralOffers([{ ...task, status: "active" }, ...referralOffers])
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "telegram":
        return "💬"
      case "twitter":
        return "🐦"
      case "discord":
        return "🎮"
      case "airdrop":
        return "🪂"
      case "website":
        return "🌐"
      default:
        return "🔗"
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Referral Market
          </CardTitle>
          <CardDescription>Browse, create, and complete referral tasks to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6 bg-card p-3 rounded-lg">
            <div className="flex items-center">
              <Coins className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="font-bold">{userData.coins.toLocaleString()}</span>
              <span className="text-xs ml-1 text-muted-foreground">$COINS</span>
            </div>
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
          </div>

          <Tabs defaultValue="browse" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="browse">Browse Offers</TabsTrigger>
              <TabsTrigger value="create">Create Offer</TabsTrigger>
              <TabsTrigger value="myoffers">My Offers & Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Available Referral Offers</h3>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="airdrop">Airdrops</SelectItem>
                      <SelectItem value="website">Websites</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {referralOffers.map((offer) => (
                    <Card key={offer.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-4 md:p-6 flex-1">
                          <div className="flex items-center mb-2">
                            <span className="text-xl mr-2">{getTypeIcon(offer.type)}</span>
                            <h4 className="text-lg font-medium">{offer.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>

                          <div className="flex items-center text-sm mb-2">
                            <Link className="h-4 w-4 mr-1" />
                            <a
                              href={offer.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline truncate"
                            >
                              {offer.link}
                            </a>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <Badge variant="outline" className="text-xs">
                              {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                            </Badge>
                            <div className="flex items-center">
                              <span className="text-sm mr-1">Created by:</span>
                              <span className="text-sm font-medium">{offer.creator}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-card p-4 md:p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                          <div className="flex items-center mb-4">
                            <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                            <span className="text-xl font-bold">{offer.reward}</span>
                            <span className="text-xs ml-1 text-muted-foreground">$COINS</span>
                          </div>

                          <Button onClick={() => acceptOffer(offer.id)} className="w-full">
                            Accept Offer
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Referral Offer</CardTitle>
                  <CardDescription>Create a new offer for other users to complete</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Offer Type</label>
                      <Select value={offerType} onValueChange={setOfferType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select offer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="airdrop">Airdrop</SelectItem>
                          <SelectItem value="telegram">Telegram</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="discord">Discord</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        placeholder="Enter a title for your offer"
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Describe what users need to do to complete this offer"
                        value={offerDescription}
                        onChange={(e) => setOfferDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Reward ($COINS)</label>
                      <Input
                        type="number"
                        placeholder="Enter reward amount"
                        value={offerReward}
                        onChange={(e) => setOfferReward(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Referral Link</label>
                      <Input
                        placeholder="Enter your referral link"
                        value={offerLink}
                        onChange={(e) => setOfferLink(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="font-medium">Balance: {userData.coins.toLocaleString()} $COINS</span>
                  </div>
                  <Button
                    onClick={createOffer}
                    disabled={
                      !offerTitle ||
                      !offerDescription ||
                      !offerReward ||
                      !offerLink ||
                      Number(offerReward) > userData.coins
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Offer
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="myoffers">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">My Active Tasks</h3>
                  {myTasks.length > 0 ? (
                    <div className="space-y-4">
                      {myTasks
                        .filter((task) => task.status !== "completed")
                        .map((task) => (
                          <Card key={task.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div className="p-4 md:p-6 flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="text-xl mr-2">{getTypeIcon(task.type)}</span>
                                  <h4 className="text-lg font-medium">{task.title}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">{task.description}</p>

                                <div className="flex items-center text-sm mb-2">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  <a
                                    href={task.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline truncate"
                                  >
                                    Visit Link
                                  </a>
                                </div>
                              </div>

                              <div className="bg-card p-4 md:p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                                <div className="flex items-center mb-4">
                                  <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                                  <span className="text-xl font-bold">{task.reward}</span>
                                  <span className="text-xs ml-1 text-muted-foreground">$COINS</span>
                                </div>

                                <div className="flex gap-2">
                                  <Button onClick={() => completeTask(task.id)} className="flex-1" variant="default">
                                    <Check className="h-4 w-4 mr-2" />
                                    Complete
                                  </Button>
                                  <Button onClick={() => cancelTask(task.id)} className="flex-1" variant="outline">
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <Card className="p-6 text-center text-muted-foreground">
                      <p>You don't have any active tasks. Browse the offers to find tasks to complete!</p>
                    </Card>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">My Completed Tasks</h3>
                  {myTasks.filter((task) => task.status === "completed").length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Task</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Creator</TableHead>
                          <TableHead className="text-right">Reward</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myTasks
                          .filter((task) => task.status === "completed")
                          .map((task) => (
                            <TableRow key={task.id}>
                              <TableCell className="font-medium">{task.title}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>{task.creator}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end">
                                  <Coins className="h-5 w-5 text-yellow-400 mr-1" />
                                  <span>{task.reward}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Card className="p-6 text-center text-muted-foreground">
                      <p>You haven't completed any tasks yet.</p>
                    </Card>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">My Created Offers</h3>
                  {myOffers.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Offer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Reward</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myOffers.map((offer) => (
                          <TableRow key={offer.id}>
                            <TableCell className="font-medium">{offer.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={offer.status === "active" ? "success" : "secondary"}>
                                {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <Coins className="h-5 w-5 text-yellow-400 mr-1" />
                                <span>{offer.reward}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Card className="p-6 text-center text-muted-foreground">
                      <p>You haven't created any offers yet. Go to the Create Offer tab to get started!</p>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
