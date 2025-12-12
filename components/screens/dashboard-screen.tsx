"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Clock, CheckCircle2, Flame, Brain, ChevronRight } from "lucide-react"

const mockStats = {
  focusTime: "2h 15m",
  tasksCompleted: 7,
  streak: 12,
}

const weeklyData = [
  { day: "Mon", hours: 3.5 },
  { day: "Tue", hours: 2.0 },
  { day: "Wed", hours: 4.2 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 3.0 },
  { day: "Sat", hours: 2.8 },
  { day: "Sun", hours: 1.2 },
]

const maxHours = Math.max(...weeklyData.map((d) => d.hours))

export function DashboardScreen() {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">{greeting}, Alex</h1>
        <p className="text-muted-foreground text-sm">Let&apos;s make today productive!</p>
      </div>

      {/* Daily Insight Card */}
      <Card className="bg-primary text-primary-foreground border-0">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary-foreground/20 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Daily Insight</p>
              <p className="text-sm opacity-90 mt-1">
                You&apos;re most productive between 10 AM and 12 PM. Schedule important tasks during this window!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-card">
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground">{mockStats.focusTime}</p>
            <p className="text-xs text-muted-foreground">Focus Today</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-lg font-bold text-foreground">{mockStats.tasksCompleted}</p>
            <p className="text-xs text-muted-foreground">Tasks Done</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-3 text-center">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
              <Flame className="w-5 h-5 text-accent" />
            </div>
            <p className="text-lg font-bold text-foreground">{mockStats.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Activity</CardTitle>
          <CardDescription>Your study hours this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-muted rounded-t-md relative flex-1 flex items-end">
                  <div
                    className="w-full bg-primary rounded-t-md transition-all duration-500"
                    style={{ height: `${(item.hours / maxHours) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestion Card */}
      <Card className="bg-secondary/10 border-secondary/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/20 rounded-xl">
              <Brain className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Recommended Next Session</p>
              <p className="text-sm text-muted-foreground">Biology - Chapter 4 Review</p>
              <p className="text-xs text-muted-foreground mt-1">Suggested: 45 minutes</p>
            </div>
          </div>
          <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            Start Now
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
