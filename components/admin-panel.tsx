"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { FishIcon as Whale, Users, Settings, Database, RefreshCw } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"

export function AdminPanel() {
  const { userData, updateUserData } = useUserData()
  const [activeTab, setActiveTab] = useState("users")
  const [mockUsers, setMockUsers] = useState([
    { id: "user1", username: "whale_lover", coins: 5000, tokens: 1.25, level: 3 },
    { id: "user2", username: "crypto_miner", coins: 12500, tokens: 3.75, level: 5 },
    { id: "user3", username: "token_collector", coins: 30000, tokens: 8.5, level: 7 },
  ])

  const [vaultBalance, setVaultBalance] = useState(5000000)
  const [secondaryVaultBalance, setSecondaryVaultBalance] = useState(250000)

  const [newCoins, setNewCoins] = useState("")
  const [newTokens, setNewTokens] = useState("")

  const handleUpdateTestUser = () => {
    if (newCoins) {
      updateUserData({ coins: Number.parseInt(newCoins) })
    }

    if (newTokens) {
      updateUserData({ tokens: Number.parseFloat(newTokens) })
    }

    setNewCoins("")
    setNewTokens("")
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Admin Panel
          </CardTitle>
          <CardDescription>Manage users, tokens, and system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="users" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="tokens" className="flex items-center">
                <Whale className="h-4 w-4 mr-2" />
                <span>Tokens</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                <span>System</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Test User</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">$COINS</label>
                        <Input
                          type="number"
                          placeholder={userData.coins.toString()}
                          value={newCoins}
                          onChange={(e) => setNewCoins(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">$WBUX</label>
                        <Input
                          type="number"
                          placeholder={userData.tokens.toString()}
                          value={newTokens}
                          onChange={(e) => setNewTokens(e.target.value)}
                          step="0.0001"
                        />
                      </div>
                    </div>
                    <Button onClick={handleUpdateTestUser}>Update Test User</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">All Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Username</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>$COINS</TableHead>
                          <TableHead>$WBUX</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.level}</TableCell>
                            <TableCell>{user.coins.toLocaleString()}</TableCell>
                            <TableCell>{user.tokens.toFixed(4)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tokens">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Whale className="h-5 w-5 text-primary mr-2" />
                        Main Vault
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{vaultBalance.toLocaleString()} $WBUX</div>
                      <p className="text-sm text-muted-foreground">Tokens available for user claims</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Balance
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Whale className="h-5 w-5 text-primary mr-2" />
                        Secondary Vault
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{secondaryVaultBalance.toLocaleString()} $WBUX</div>
                      <p className="text-sm text-muted-foreground">Tokens from in-game payments</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Balance
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Token Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Swap Rate</label>
                        <div className="flex items-center gap-2">
                          <Input type="number" defaultValue="10000" />
                          <span>$COINS</span>
                          <span>=</span>
                          <Input type="number" defaultValue="0.15" />
                          <span>$WBUX</span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Update Swap Rate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Database Connection</span>
                        <span className="text-green-500 font-medium">Connected</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>BSC Chain Connection</span>
                        <span className="text-green-500 font-medium">Connected</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>MINTME Chain Connection</span>
                        <span className="text-yellow-500 font-medium">Pending</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>Active Users</span>
                        <span>4</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Status
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mining Parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Global Mining Rate Multiplier</label>
                        <Input type="number" defaultValue="1.0" step="0.1" />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Global Boost Multiplier</label>
                        <Input type="number" defaultValue="1.0" step="0.1" />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Mining Duration Multiplier</label>
                        <Input type="number" defaultValue="1.0" step="0.1" />
                      </div>

                      <div className="flex justify-end">
                        <Button>Update Parameters</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
