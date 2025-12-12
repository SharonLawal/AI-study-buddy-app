"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, BookOpen, GraduationCap, Coffee, Dumbbell } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeBlock {
  id: string
  startTime: string
  endTime: string
  title: string
  type: "fixed" | "ai-suggested"
  category: "class" | "study" | "break" | "activity"
}

const mockSchedule: TimeBlock[] = [
  { id: "1", startTime: "09:00", endTime: "10:00", title: "Mathematics", type: "fixed", category: "class" },
  {
    id: "2",
    startTime: "10:15",
    endTime: "11:00",
    title: "Study: Calculus Review",
    type: "ai-suggested",
    category: "study",
  },
  { id: "3", startTime: "11:00", endTime: "12:00", title: "Physics Lab", type: "fixed", category: "class" },
  { id: "4", startTime: "12:00", endTime: "13:00", title: "Lunch Break", type: "fixed", category: "break" },
  {
    id: "5",
    startTime: "13:00",
    endTime: "14:30",
    title: "Study: Biology Ch.4",
    type: "ai-suggested",
    category: "study",
  },
  { id: "6", startTime: "14:30", endTime: "15:30", title: "Chemistry", type: "fixed", category: "class" },
  {
    id: "7",
    startTime: "16:00",
    endTime: "16:30",
    title: "Exercise Break",
    type: "ai-suggested",
    category: "activity",
  },
  {
    id: "8",
    startTime: "17:00",
    endTime: "18:30",
    title: "Study: Essay Writing",
    type: "ai-suggested",
    category: "study",
  },
]

const categoryIcons = {
  class: GraduationCap,
  study: BookOpen,
  break: Coffee,
  activity: Dumbbell,
}

export function PlannerScreen() {
  const [schedule, setSchedule] = useState(mockSchedule)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleMagicGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsGenerating(false)
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Today&apos;s Plan</h1>
          <p className="text-muted-foreground text-sm">Thursday, December 12</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-muted-foreground">Fixed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-secondary" />
          <span className="text-muted-foreground">AI Suggested</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {schedule.map((block) => {
          const Icon = categoryIcons[block.category]
          return (
            <Card
              key={block.id}
              className={cn(
                "border-l-4 transition-all",
                block.type === "fixed" ? "border-l-primary" : "border-l-secondary",
              )}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", block.type === "fixed" ? "bg-primary/10" : "bg-secondary/20")}>
                    <Icon className={cn("w-4 h-4", block.type === "fixed" ? "text-primary" : "text-secondary")} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{block.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {block.startTime} - {block.endTime}
                    </p>
                  </div>
                  {block.type === "ai-suggested" && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium">
                      AI
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Magic Generate FAB */}
      <Button
        onClick={handleMagicGenerate}
        disabled={isGenerating}
        className="fixed bottom-24 right-4 max-w-md w-14 h-14 rounded-full shadow-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        size="icon"
      >
        <Sparkles className={cn("w-6 h-6", isGenerating && "animate-spin")} />
      </Button>
    </div>
  )
}
