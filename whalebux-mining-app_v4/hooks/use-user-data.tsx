"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { LEVEL_CONFIG } from "@/lib/config"

interface UserData {
  coins: number
  tokens: number
  experience: number
  level: number
  rateUpgradeLevel: number
  boostUpgradeLevel: number
  timeUpgradeLevel: number
}

interface UserDataContextType {
  userData: UserData
  updateUserData: (updates: Partial<UserData>) => void
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    coins: 100,
    tokens: 0.5,
    experience: 50,
    level: 1,
    rateUpgradeLevel: 0,
    boostUpgradeLevel: 0,
    timeUpgradeLevel: 0,
  })

  // Load user data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("whalebux-user-data")
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData))
      } catch (error) {
        console.error("Failed to parse saved user data:", error)
      }
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("whalebux-user-data", JSON.stringify(userData))
  }, [userData])

  // Calculate user level based on experience
  useEffect(() => {
    let newLevel = 1

    for (let level = 9; level >= 1; level--) {
      if (userData.experience >= LEVEL_CONFIG[level].xpMin) {
        newLevel = level
        break
      }
    }

    if (newLevel !== userData.level) {
      setUserData((prev) => ({ ...prev, level: newLevel }))
    }
  }, [userData.experience, userData.level])

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updates }))
  }

  return <UserDataContext.Provider value={{ userData, updateUserData }}>{children}</UserDataContext.Provider>
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider")
  }
  return context
}
