"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Coins, ArrowRight, WalletIcon, AlertCircle } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import Image from "next/image"

export function WalletPanel() {
  const { userData, updateUserData } = useUserData()
  const [swapAmount, setSwapAmount] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Swap rate: 10000 $COINS = 0.15 $WBUX
  const SWAP_RATE = 0.15 / 10000

  const handleSwapAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setSwapAmount(value)
    }
  }

  const calculateTokens = (coins: number) => {
    return coins * SWAP_RATE
  }

  const handleSwap = () => {
    const coinsToSwap = Number.parseInt(swapAmount)
    if (isNaN(coinsToSwap) || coinsToSwap <= 0) return
    if (coinsToSwap > userData.coins) return

    const tokensToReceive = calculateTokens(coinsToSwap)

    updateUserData({
      coins: userData.coins - coinsToSwap,
      tokens: userData.tokens + tokensToReceive,
    })

    setSwapAmount("")
  }

  const connectWallet = async () => {
    // Simulate MetaMask connection
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddress(accounts[0])
        setWalletConnected(true)
      } catch (error) {
        console.error("User denied account access")
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask to connect your wallet.")
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Manage your currencies and connect your wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                  $COINS Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.coins.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-1">In-game currency for upgrades</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="h-5 w-5 mr-2 relative">
                    <Image
                      src="/images/wbux-token.png"
                      alt="WhaleBux Token"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  $WBUX Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.tokens.toFixed(4)}</div>
                <p className="text-sm text-muted-foreground mt-1">Blockchain token</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Swap $COINS for $WBUX</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <Input
                    type="text"
                    placeholder="Amount of $COINS"
                    value={swapAmount}
                    onChange={handleSwapAmountChange}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 relative">
                    <Image
                      src="/images/wbux-token.png"
                      alt="WhaleBux Token"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="0.0000 $WBUX"
                    value={swapAmount ? calculateTokens(Number.parseInt(swapAmount)).toFixed(4) : ""}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground mt-2 mb-4">Swap Rate: 10,000 $COINS = 0.15 $WBUX</div>

            <Button
              onClick={handleSwap}
              disabled={!swapAmount || Number.parseInt(swapAmount) <= 0 || Number.parseInt(swapAmount) > userData.coins}
              className="w-full"
            >
              Swap
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Connect Wallet</h3>

            {!walletConnected ? (
              <Button onClick={connectWallet} className="w-full" variant="outline">
                <WalletIcon className="h-4 w-4 mr-2" />
                Connect MetaMask
              </Button>
            ) : (
              <div className="space-y-4">
                <Alert variant="success">
                  <WalletIcon className="h-4 w-4" />
                  <AlertTitle>Wallet Connected</AlertTitle>
                  <AlertDescription>
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                  </AlertDescription>
                </Alert>

                <Button className="w-full">Claim $WBUX Tokens</Button>
              </div>
            )}

            <div className="mt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  Connect your MetaMask wallet to claim your $WBUX tokens on the BSC and MINTME chains.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
