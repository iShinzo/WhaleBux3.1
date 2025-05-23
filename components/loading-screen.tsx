"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 5
      })
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="loading-screen">
      <div className="relative mb-8">
        <div className="relative h-24 w-24 glow">
          <Image
            src="/images/wbux-token.png"
            alt="WhaleBux Token"
            width={96}
            height={96}
            className="object-contain spinning-coin"
          />
        </div>
        <div className="absolute -right-4 -top-4 bg-yellow-400 rounded-full p-2 animate-bounce">
          <span className="text-black font-bold">$</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-blue-500">WhaleBux</h1>
      <p className="text-muted-foreground mb-6">Mining the future...</p>
      <div className="w-64 mb-2">
        <Progress value={progress} className="h-2" />
      </div>
      <p className="text-xs text-muted-foreground">{progress}% loaded</p>
    </div>
  )
}
