"use client"

import type { ReactNode } from "react"
import { UserDataProvider } from "@/hooks/use-user-data"
import { MiningProvider } from "@/hooks/use-mining-state"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserDataProvider>
      <MiningProvider>{children}</MiningProvider>
    </UserDataProvider>
  )
}
