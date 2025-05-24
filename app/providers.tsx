"use client"

import type { ReactNode } from "react"
import { MiningProvider } from "@/hooks/use-mining-state"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MiningProvider>{children}</MiningProvider>
  )
}