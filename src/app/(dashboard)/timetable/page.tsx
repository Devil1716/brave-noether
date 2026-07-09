"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CalendarDays, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSlotCourse {
  id: string;
  code: string;
  title: string;
  theorySlot: string;
  labSlot: string;
}

export default function TimetablePage() {
  const [courses, setCourses] = useState<TimeSlotCourse[]>([]);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [theorySlot, setTheorySlot] = useState("");
  const [labSlot, setLabSlot] = useState("");
  const [error, setError] = useState("");

  const checkClash = (tSlot: string, lSlot: string) => {
    const tSlots = tSlot.split(",").map(s => s.trim()).filter(Boolean);
    const lSlots = lSlot.split(",").map(s => s.trim()).filter(Boolean);

    for (const c of courses) {
      const existingTSlots = c.theorySlot.split(",").map(s => s.trim()).filter(Boolean);
      const existingLSlots = c.labSlot.split(",").map(s => s.trim()).filter(Boolean);

      // Check theory clashes
      for (const ts of tSlots) {
        if (existingTSlots.includes(ts)) {
          return `Clash Detected: Theory slot ${ts} is already taken by ${c.code}.`;
        }
      }

      // Check lab clashes
      for (const ls of lSlots) {
        if (existingLSlots.includes(ls)) {
          return `Clash Detected: Lab slot ${ls} is already taken by ${c.code}.`;
        }
      }
    }
    return null;
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code || !title || (!theorySlot && !labSlot)) {
      setError("Please fill required fields (Code, Title, and at least one slot).");
      return;
    }

    const clashError = checkClash(theorySlot, labSlot);
    if (clashError) {
      setError(clashError);
      return;
    }

    setCourses([...courses, { id: Date.now().toString(), code, title, theorySlot, labSlot }]);
    setCode("");
    setTitle("");
    setTheorySlot("");
    setLabSlot("");
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">Timetable Builder</h1>
        <p className="text-muted-foreground mt-2 text-lg">Automatically detects slot clashes to ensure a conflict-free semester.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Input Form */}
        <Card className="glass border-0 md:col-span-1 h-fit">
          <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add Course to Timetable
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="p-3 text-sm text-yellow-500 bg-yellow-500/10 rounded-md border border-yellow-500/30 flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {error}
              </motion.div>
            )}
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Course Code</label>
                <Input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="e.g., CSE1037" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Course Title</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Programming in Python" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Theory Slot(s)</label>
                <Input value={theorySlot} onChange={e => setTheorySlot(e.target.value.toUpperCase())} placeholder="e.g., F, G" className="bg-black/20 border-white/10" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Lab Slot(s)</label>
                <Input value={labSlot} onChange={e => setLabSlot(e.target.value.toUpperCase())} placeholder="e.g., L19, L29" className="bg-black/20 border-white/10" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Add Course</Button>
            </form>
          </CardContent>
        </Card>

        {/* Selected Courses Display */}
        <Card className="glass border-0 md:col-span-2">
          <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              Registered Slots
            </CardTitle>
            <CardDescription>Your registered courses. No clashes detected.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {courses.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-white/10 rounded-xl">
                No courses added yet. Start by adding a course.
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {courses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{course.code} <span className="text-muted-foreground font-normal text-sm ml-2">{course.title}</span></h3>
                        <div className="flex items-center gap-2 mt-2">
                          {course.theorySlot && <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Theory: {course.theorySlot}</Badge>}
                          {course.labSlot && <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">Lab: {course.labSlot}</Badge>}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/20 hover:text-destructive" onClick={() => removeCourse(course.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
