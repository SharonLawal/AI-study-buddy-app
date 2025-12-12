"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Bell, Brain, Trash2, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function SettingsScreen() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [aiPersonality, setAiPersonality] = useState<"encouraging" | "strict">("encouraging")

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your experience</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/student-avatar.png" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">AX</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground">Alex Student</h3>
              <p className="text-sm text-muted-foreground">alex.student@email.com</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Preferences</h2>

        {/* Dark Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Moon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Easier on the eyes at night</p>
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Bell className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">Session reminders & tips</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* AI Personality */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Brain className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">AI Personality</p>
                <p className="text-xs text-muted-foreground">How your AI buddy talks to you</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAiPersonality("encouraging")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border",
                  aiPersonality === "encouraging"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-transparent hover:border-border",
                )}
              >
                😊 Encouraging
              </button>
              <button
                onClick={() => setAiPersonality("strict")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all border",
                  aiPersonality === "strict"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-transparent hover:border-border",
                )}
              >
                📚 Strict
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Data</h2>
        <Card className="border-destructive/30">
          <CardContent className="p-4">
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => alert("This would clear all data in a real app")}
            >
              <Trash2 className="w-4 h-4" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
