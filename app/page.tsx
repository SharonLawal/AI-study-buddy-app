"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { FocusScreen } from "@/components/screens/focus-screen"
import { PlannerScreen } from "@/components/screens/planner-screen"
import { NotesScreen } from "@/components/screens/notes-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"

export type TabType = "home" | "focus" | "planner" | "notes" | "settings"

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home")

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "home" && <DashboardScreen />}
        {activeTab === "focus" && <FocusScreen />}
        {activeTab === "planner" && <PlannerScreen />}
        {activeTab === "notes" && <NotesScreen />}
        {activeTab === "settings" && <SettingsScreen />}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
