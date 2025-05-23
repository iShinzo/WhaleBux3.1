"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Calendar, Trophy, Coins, ExternalLink, Clock, RotateCw } from "lucide-react"
import Image from "next/image"
import { useUserData } from "@/hooks/use-user-data"

interface Task {
  id: string
  title: string
  description: string
  reward: {
    type: "coins" | "tokens" | "boost" | "rate" | "time"
    amount: number
  }
  progress: number
  maxProgress: number
  completed: boolean
  expiresAt?: string
  link?: string
}

export function TasksPanel() {
  const { userData, updateUserData } = useUserData()
  const [activeTab, setActiveTab] = useState("daily")

  // Mock data for tasks
  const [dailyTasks, setDailyTasks] = useState<Task[]>([
    {
      id: "daily1",
      title: "Mine for 10 minutes",
      description: "Start a mining session and let it run for at least 10 minutes.",
      reward: {
        type: "coins",
        amount: 100,
      },
      progress: 0,
      maxProgress: 1,
      completed: false,
    },
    {
      id: "daily2",
      title: "Visit our Telegram channel",
      description: "Check out the latest announcements in our Telegram channel.",
      reward: {
        type: "coins",
        amount: 50,
      },
      progress: 0,
      maxProgress: 1,
      completed: false,
      link: "https://t.me/whalebux",
    },
    {
      id: "daily3",
      title: "Swap 1000 $COINS to $WBUX",
      description: "Convert some of your $COINS to $WBUX tokens.",
      reward: {
        type: "boost",
        amount: 5,
      },
      progress: 0,
      maxProgress: 1,
      completed: false,
    },
  ])

  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([
    {
      id: "weekly1",
      title: "Complete 5 daily tasks",
      description: "Finish 5 daily tasks this week.",
      reward: {
        type: "tokens",
        amount: 0.05,
      },
      progress: 2,
      maxProgress: 5,
      completed: false,
      expiresAt: "Sunday, 11:59 PM",
    },
    {
      id: "weekly2",
      title: "Refer a friend",
      description: "Invite a new user to join WhaleBux using your referral link.",
      reward: {
        type: "rate",
        amount: 0.5,
      },
      progress: 0,
      maxProgress: 1,
      completed: false,
      expiresAt: "Sunday, 11:59 PM",
    },
    {
      id: "weekly3",
      title: "Mine 5000 $COINS",
      description: "Earn a total of 5000 $COINS from mining this week.",
      reward: {
        type: "time",
        amount: 15,
      },
      progress: 1200,
      maxProgress: 5000,
      completed: false,
      expiresAt: "Sunday, 11:59 PM",
    },
  ])

  const [specialTasks, setSpecialTasks] = useState<Task[]>([
    {
      id: "special1",
      title: "Join WhaleBux Discord",
      description: "Join our Discord server and verify your account.",
      reward: {
        type: "tokens",
        amount: 0.1,
      },
      progress: 0,
      maxProgress: 1,
      completed: false,
      link: "https://discord.gg/whalebux",
    },
    {
      id: "special2",
      title: "Follow on Twitter",
      description: "Follow our Twitter account and retweet the pinned post.",
      reward: {
        type: "coins",
        amount: 500,
      },
      progress: 0,
      maxProgress: 1,
      completed: false,
      link: "https://twitter.com/whalebux",
    },
  ])

  const completeTask = (taskType: string, taskId: string) => {
    let taskList: Task[] = []
    let setTaskList: React.Dispatch<React.SetStateAction<Task[]>> = () => {}

    if (taskType === "daily") {
      taskList = dailyTasks
      setTaskList = setDailyTasks
    } else if (taskType === "weekly") {
      taskList = weeklyTasks
      setTaskList = setWeeklyTasks
    } else if (taskType === "special") {
      taskList = specialTasks
      setTaskList = setSpecialTasks
    }

    const task = taskList.find((t) => t.id === taskId)
    if (!task || task.completed) return

    // Update task progress
    if (task.progress < task.maxProgress) {
      task.progress = task.maxProgress
      task.completed = true

      // Update user data based on reward
      const updates: any = {}

      if (task.reward.type === "coins") {
        updates.coins = userData.coins + task.reward.amount
      } else if (task.reward.type === "tokens") {
        updates.tokens = userData.tokens + task.reward.amount
      } else if (task.reward.type === "boost") {
        updates.boostUpgradeLevel = userData.boostUpgradeLevel + 1
      } else if (task.reward.type === "rate") {
        updates.rateUpgradeLevel = userData.rateUpgradeLevel + 1
      } else if (task.reward.type === "time") {
        updates.timeUpgradeLevel = userData.timeUpgradeLevel + 1
      }

      updateUserData(updates)

      // Update task list
      setTaskList([...taskList])
    }
  }

  const resetDailyTasks = () => {
    setDailyTasks(
      dailyTasks.map((task) => ({
        ...task,
        progress: 0,
        completed: false,
      })),
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

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Tasks
          </CardTitle>
          <CardDescription>Complete tasks to earn rewards and boost your mining</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="daily" className="flex items-center">
                <RotateCw className="h-4 w-4 mr-2" />
                <span>Daily</span>
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Weekly</span>
              </TabsTrigger>
              <TabsTrigger value="special" className="flex items-center">
                <Trophy className="h-4 w-4 mr-2" />
                <span>Special</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Daily Tasks</h3>
                  <Button variant="outline" size="sm" onClick={resetDailyTasks}>
                    <RotateCw className="h-4 w-4 mr-2" />
                    Reset (Demo)
                  </Button>
                </div>

                {dailyTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`border ${task.completed ? "border-green-500/50 bg-green-500/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            {task.completed && (
                              <Badge variant="success" className="ml-2">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>

                          {task.link && (
                            <a
                              href={task.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Link
                            </a>
                          )}

                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>
                                {task.progress} / {task.maxProgress}
                              </span>
                            </div>
                            <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                          </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-2">
                          <div className="flex items-center">
                            {getRewardIcon(task.reward.type)}
                            <span className="ml-1 font-medium">
                              {getRewardLabel(task.reward.type, task.reward.amount)}
                            </span>
                          </div>

                          <Button onClick={() => completeTask("daily", task.id)} disabled={task.completed} size="sm">
                            {task.completed ? "Claimed" : "Complete"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="weekly">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Weekly Tasks</h3>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    Resets in 3 days
                  </Badge>
                </div>

                {weeklyTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`border ${task.completed ? "border-green-500/50 bg-green-500/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            {task.completed && (
                              <Badge variant="success" className="ml-2">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>

                          {task.expiresAt && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Expires: {task.expiresAt}</span>
                            </div>
                          )}

                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>
                                {task.progress} / {task.maxProgress}
                              </span>
                            </div>
                            <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                          </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-2">
                          <div className="flex items-center">
                            {getRewardIcon(task.reward.type)}
                            <span className="ml-1 font-medium">
                              {getRewardLabel(task.reward.type, task.reward.amount)}
                            </span>
                          </div>

                          <Button
                            onClick={() => completeTask("weekly", task.id)}
                            disabled={task.completed || task.progress < task.maxProgress}
                            size="sm"
                          >
                            {task.completed
                              ? "Claimed"
                              : task.progress < task.maxProgress
                                ? `${task.progress}/${task.maxProgress}`
                                : "Complete"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="special">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Special Tasks</h3>

                {specialTasks.map((task) => (
                  <Card
                    key={task.id}
                    className={`border ${task.completed ? "border-green-500/50 bg-green-500/5" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            {task.completed && (
                              <Badge variant="success" className="ml-2">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>

                          {task.link && (
                            <a
                              href={task.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Link
                            </a>
                          )}
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-2">
                          <div className="flex items-center">
                            {getRewardIcon(task.reward.type)}
                            <span className="ml-1 font-medium">
                              {getRewardLabel(task.reward.type, task.reward.amount)}
                            </span>
                          </div>

                          <Button onClick={() => completeTask("special", task.id)} disabled={task.completed} size="sm">
                            {task.completed ? "Claimed" : "Complete"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
