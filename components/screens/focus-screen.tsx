"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, Square, RotateCcw, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const durations = [
  { label: "25m", value: 25 },
  { label: "45m", value: 45 },
  { label: "60m", value: 60 },
]

export function FocusScreen() {
  const [selectedDuration, setSelectedDuration] = useState(25)
  const [timeLeft, setTimeLeft] = useState(selectedDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [distractionBlock, setDistractionBlock] = useState(false)
  const [sessionIntent, setSessionIntent] = useState("")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSeconds = selectedDuration * 60
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100
  const circumference = 2 * Math.PI * 120

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = useCallback(() => {
    setIsRunning(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const handleStop = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(selectedDuration * 60)
  }, [selectedDuration])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(selectedDuration * 60)
  }, [selectedDuration])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(selectedDuration * 60)
    }
  }, [selectedDuration, isRunning])

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Focus Mode</h1>
        <p className="text-muted-foreground text-sm">Stay concentrated, achieve more</p>
      </div>

      {/* Timer Circle */}
      <div className="flex justify-center py-6">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-primary transition-all duration-300"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
            />
          </svg>
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-foreground tabular-nums">{formatTime(timeLeft)}</span>
            <span className="text-sm text-muted-foreground mt-2">{isRunning ? "Focusing..." : "Ready to focus"}</span>
          </div>
        </div>
      </div>

      {/* Duration Pills */}
      <div className="flex justify-center gap-3">
        {durations.map((d) => (
          <button
            key={d.value}
            onClick={() => !isRunning && setSelectedDuration(d.value)}
            disabled={isRunning}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all",
              selectedDuration === d.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
              isRunning && "opacity-50 cursor-not-allowed",
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <Button size="lg" onClick={handleStart} className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90">
            <Play className="w-6 h-6 fill-current" />
          </Button>
        ) : (
          <>
            <Button size="lg" variant="outline" onClick={handlePause} className="w-14 h-14 rounded-full bg-transparent">
              <Pause className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="destructive" onClick={handleStop} className="w-14 h-14 rounded-full">
              <Square className="w-5 h-5 fill-current" />
            </Button>
          </>
        )}
        <Button size="lg" variant="ghost" onClick={handleReset} className="w-14 h-14 rounded-full" disabled={isRunning}>
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* AI Distraction Blocking */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground">AI Distraction Blocking</p>
                <p className="text-xs text-muted-foreground">Block distracting apps during focus</p>
              </div>
            </div>
            <Switch checked={distractionBlock} onCheckedChange={setDistractionBlock} />
          </div>
        </CardContent>
      </Card>

      {/* Session Intent */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <p className="font-medium text-foreground">Session Intent</p>
          <Textarea
            placeholder="What will you accomplish? (e.g., 'I will finish chapter 4')"
            value={sessionIntent}
            onChange={(e) => setSessionIntent(e.target.value)}
            className="min-h-[80px] resize-none bg-muted/50 border-0"
          />
        </CardContent>
      </Card>
    </div>
  )
}
