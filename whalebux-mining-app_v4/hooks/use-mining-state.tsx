"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useUserData } from "@/hooks/use-user-data"
import { LEVEL_CONFIG } from "@/lib/config"

interface MiningState {
  miningActive: boolean
  miningProgress: number
  timeLeft: number
  earnings: number
  startTime: number | null
  endTime: number | null
}

interface MiningContextType {
  miningState: MiningState
  startMining: () => void
  claimEarnings: () => void
  calculatePotentialEarnings: () => number
  actualDuration: number
  actualRate: number
  actualBoost: number
}

const MiningContext = createContext<MiningContextType | undefined>(undefined)

const MINING_STATE_KEY = "whalebux-mining-state"

export function MiningProvider({ children }: { children: ReactNode }) {
  const { userData, updateUserData } = useUserData()
  const [miningState, setMiningState] = useState<MiningState>({
    miningActive: false,
    miningProgress: 0,
    timeLeft: 0,
    earnings: 0,
    startTime: null,
    endTime: null,
  })

  const currentLevel = userData.level
  const levelConfig = LEVEL_CONFIG[currentLevel]

  // Calculate mining duration in minutes
  const baseDuration = levelConfig.miningDuration * 60
  const timeReduction = userData.timeUpgradeLevel * 30
  // For testing: 2 minutes (120 seconds) instead of hours
  // In production, use: const actualDuration = Math.max(baseDuration - timeReduction, 30)
  const actualDuration = 120 // 2 minutes for testing

  // Calculate mining rate
  const baseRate = levelConfig.baseRate
  const rateBonus = userData.rateUpgradeLevel * 1
  const actualRate = baseRate + rateBonus

  // Calculate mining boost
  const baseBoost = levelConfig.boost
  const boostBonus = userData.boostUpgradeLevel * 5
  const actualBoost = baseBoost + boostBonus

  // Calculate potential earnings
  const calculatePotentialEarnings = () => {
    return actualRate * (actualDuration / 60) * (1 + actualBoost / 100)
  }

  // Load mining state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem(MINING_STATE_KEY)
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as MiningState

        // Check if mining is still active based on end time
        if (parsedState.endTime && parsedState.miningActive) {
          const now = Date.now()
          if (now < parsedState.endTime) {
            // Mining is still in progress
            const timeLeft = Math.round((parsedState.endTime - now) / 1000)
            const totalDuration = parsedState.endTime - parsedState.startTime!
            const elapsed = now - parsedState.startTime!
            const progress = (elapsed / totalDuration) * 100

            setMiningState({
              ...parsedState,
              timeLeft,
              miningProgress: progress,
            })
          } else {
            // Mining has completed while away
            const finalEarnings = Math.floor(calculatePotentialEarnings())
            setMiningState({
              ...parsedState,
              miningActive: false,
              timeLeft: 0,
              miningProgress: 100,
              earnings: finalEarnings,
            })
          }
        } else {
          // Just restore the state as is
          setMiningState(parsedState)
        }
      } catch (error) {
        console.error("Failed to parse saved mining state:", error)
      }
    }
  }, [])

  // Save mining state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(MINING_STATE_KEY, JSON.stringify(miningState))
  }, [miningState])

  // Handle mining timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (miningState.miningActive && miningState.timeLeft > 0) {
      interval = setInterval(() => {
        setMiningState((prev) => {
          const newTimeLeft = prev.timeLeft - 1
          const newProgress = 100 - (newTimeLeft / actualDuration) * 100
          return {
            ...prev,
            timeLeft: newTimeLeft,
            miningProgress: newProgress,
          }
        })
      }, 1000)
    } else if (miningState.miningActive && miningState.timeLeft <= 0) {
      // Mining completed
      const finalEarnings = Math.floor(calculatePotentialEarnings())
      setMiningState((prev) => ({
        ...prev,
        miningActive: false,
        earnings: finalEarnings,
      }))
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [miningState.miningActive, miningState.timeLeft, actualDuration])

  const startMining = () => {
    const now = Date.now()
    const endTime = now + actualDuration * 1000

    setMiningState({
      miningActive: true,
      miningProgress: 0,
      timeLeft: actualDuration,
      earnings: 0,
      startTime: now,
      endTime: endTime,
    })
  }

  const claimEarnings = () => {
    updateUserData({
      coins: userData.coins + miningState.earnings,
      experience: userData.experience + miningState.earnings,
    })

    setMiningState({
      miningActive: false,
      miningProgress: 0,
      timeLeft: 0,
      earnings: 0,
      startTime: null,
      endTime: null,
    })
  }

  return (
    <MiningContext.Provider
      value={{
        miningState,
        startMining,
        claimEarnings,
        calculatePotentialEarnings,
        actualDuration,
        actualRate,
        actualBoost,
      }}
    >
      {children}
    </MiningContext.Provider>
  )
}

export function useMiningState() {
  const context = useContext(MiningContext)
  if (context === undefined) {
    throw new Error("useMiningState must be used within a MiningProvider")
  }
  return context
}
