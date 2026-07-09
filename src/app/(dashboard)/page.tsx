"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCurriculumStore } from "@/store/useCurriculumStore";
import { TOTAL_REQUIRED_CREDITS } from "@/data/curriculum";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { GraduationCap, Target, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const percentage = Math.min((completed / total) * 100, 100);
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-300"
        />
        <motion.circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tracking-tighter">{completed}</span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">/ {total}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const getCompletedCredits = useCurriculumStore((state) => state.getCompletedCredits);
  const getRemainingCredits = useCurriculumStore((state) => state.getRemainingCredits);

  const completed = getCompletedCredits();
  const remaining = getRemainingCredits();

  // Mock data for MVP
  const currentCGPA = 8.4;
  const targetCGPA = 9.0;
  const currentSemester = 5;
  const expectedGraduation = "July 2027";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2 text-lg">Welcome back, {user?.email?.split('@')[0]}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <Card className="glass md:col-span-2 border-0 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <CardHeader>
            <CardTitle>Degree Progress</CardTitle>
            <CardDescription>B.Tech Computer Science and Engineering (AIML)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-10">
            <ProgressRing completed={completed} total={TOTAL_REQUIRED_CREDITS} />
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Credits Completed</p>
                  <p className="text-2xl font-medium">{completed}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Credits Remaining</p>
                  <p className="text-2xl font-medium">{remaining}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Completion</span>
                  <span className="font-medium">{Math.round((completed / TOTAL_REQUIRED_CREDITS) * 100)}%</span>
                </div>
                <Progress value={(completed / TOTAL_REQUIRED_CREDITS) * 100} className="h-2 bg-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="glass border-0 bg-white/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-1/20 flex items-center justify-center border border-chart-1/30">
                <TrendingUp className="w-6 h-6 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current CGPA</p>
                <p className="text-2xl font-semibold">{currentCGPA}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-0 bg-white/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-2/20 flex items-center justify-center border border-chart-2/30">
                <Target className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target CGPA</p>
                <p className="text-2xl font-semibold">{targetCGPA}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Academic Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-4 rounded-xl bg-black/20 border border-white/5">
              <div>
                <p className="text-sm text-muted-foreground">Current Semester</p>
                <p className="text-lg font-medium">Semester {currentSemester}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Expected Graduation</p>
                <p className="text-lg font-medium">{expectedGraduation}</p>
              </div>
            </div>
            <Link href="/curriculum" className="group flex items-center justify-between p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all border border-primary/20 cursor-pointer">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="font-medium">View Full Curriculum</span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </CardContent>
        </Card>
        
        {/* Placeholder for future module like alerts */}
        <Card className="glass border-0 bg-white/5 opacity-50 relative overflow-hidden flex items-center justify-center min-h-[200px]">
          <div className="text-center space-y-2">
            <p className="font-medium">Upcoming Notifications</p>
            <p className="text-sm text-muted-foreground">Seat alerts and timetable clashes will appear here.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
