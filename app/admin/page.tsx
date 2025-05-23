"use client"

import { AdminPanel } from "@/components/admin-panel"
import { MatrixRain } from "@/components/matrix-rain"

export default function AdminPage() {
  return (
    <main className="min-h-screen p-4 md:p-6 relative overflow-hidden">
      <MatrixRain />

      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">WhaleBux Admin</h1>
          <p className="text-muted-foreground">Manage your WhaleBux mining application</p>
        </header>

        <AdminPanel />
      </div>
    </main>
  )
}
