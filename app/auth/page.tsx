"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "../../hooks/use-auth"
import { MatrixRain } from "@/components/matrix-rain"
import { Skeleton } from "@/components/ui/skeleton"

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("signin")
  const [isClient, setIsClient] = useState(false)
  const { signIn, signUp, isLoading } = useAuth() // Moved useAuth hook to the top level

  // Use useEffect to ensure we're on the client side before using the useAuth hook
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      sessionStorage.setItem("wbux_logged_in", "true")
      router.push("/")
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password || !username) {
      setError("Please fill in all fields")
      return
    }

    const { error } = await signUp(email, password, username)

    if (error) {
      setError(error.message)
    } else {
      sessionStorage.setItem("wbux_logged_in", "true")
      router.push("/")
    }
  }

  // If we're not on the client yet, show a loading state
  if (!isClient) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <div className="w-full max-w-md z-10">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">WhaleBux Mining</CardTitle>
              <CardDescription>Sign in to access your mining dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <MatrixRain />

      <div className="w-full max-w-md z-10">
        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">WhaleBux Mining</CardTitle>
            <CardDescription>Sign in to access your mining dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            By continuing, you agree to the WhaleBux Terms of Service and Privacy Policy.
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
