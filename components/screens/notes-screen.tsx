"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewMode = "tasks" | "notes"

interface Task {
  id: string
  text: string
  completed: boolean
  priority: "high" | "medium" | "low"
}

const mockTasks: Task[] = [
  { id: "1", text: "Review Chapter 4 - Biology", completed: false, priority: "high" },
  { id: "2", text: "Submit Math Assignment", completed: true, priority: "high" },
  { id: "3", text: "Read 20 pages of History", completed: false, priority: "medium" },
  { id: "4", text: "Practice Spanish vocab", completed: false, priority: "low" },
  { id: "5", text: "Prepare lab report outline", completed: true, priority: "medium" },
]

const priorityColors = {
  high: "bg-destructive/20 text-destructive",
  medium: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
  low: "bg-secondary/20 text-secondary",
}

export function NotesScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("tasks")
  const [tasks, setTasks] = useState(mockTasks)
  const [noteContent, setNoteContent] = useState(
    "Cell Biology Notes:\n\n- Mitochondria is the powerhouse of the cell\n- Cell membrane controls what enters/exits\n- Nucleus contains DNA\n\nKey concepts to review:\n1. Cellular respiration\n2. Photosynthesis process\n3. Cell division stages",
  )
  const [newTask, setNewTask] = useState("")

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prev) => [...prev, { id: Date.now().toString(), text: newTask, completed: false, priority: "medium" }])
      setNewTask("")
    }
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notes & Tasks</h1>
        <p className="text-muted-foreground text-sm">Stay organized, stay ahead</p>
      </div>

      {/* Segmented Control */}
      <div className="flex p-1 bg-muted rounded-lg">
        <button
          onClick={() => setViewMode("tasks")}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
            viewMode === "tasks" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          To-Do List
        </button>
        <button
          onClick={() => setViewMode("notes")}
          className={cn(
            "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
            viewMode === "notes" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          Quick Notes
        </button>
      </div>

      {viewMode === "tasks" ? (
        <div className="space-y-3">
          {/* Add Task */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Button onClick={addTask} size="icon" variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Task List */}
          {tasks.map((task) => (
            <Card key={task.id} className={cn(task.completed && "opacity-60")}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1">
                    <p
                      className={cn("text-sm text-foreground", task.completed && "line-through text-muted-foreground")}
                    >
                      {task.text}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium capitalize",
                      priorityColors[task.priority],
                    )}
                  >
                    {task.priority}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Notes Area */}
          <Card>
            <CardContent className="p-4">
              <Textarea
                placeholder="Start typing your notes..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="min-h-[300px] resize-none border-0 focus-visible:ring-0 bg-transparent p-0"
              />
            </CardContent>
          </Card>

          {/* AI Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Sparkles className="w-4 h-4" />
              AI Summarize
            </Button>
            <Button variant="outline" className="flex-1 gap-2 bg-transparent">
              <Sparkles className="w-4 h-4" />
              Turn into Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
