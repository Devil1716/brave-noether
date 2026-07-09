"use client";

import { useCurriculumStore, CourseStatus } from "@/store/useCurriculumStore";
import { curriculumData, CATEGORY_REQUIREMENTS, CourseCategory } from "@/data/curriculum";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const getStatusColor = (status?: CourseStatus) => {
  switch (status) {
    case "Completed": return "bg-chart-2/20 text-chart-2 border-chart-2/50";
    case "In Progress": return "bg-chart-3/20 text-chart-3 border-chart-3/50";
    case "Not Registered": return "bg-white/10 text-muted-foreground border-white/20";
    default: return "bg-white/10 text-muted-foreground border-white/20";
  }
};

export default function CurriculumPage() {
  const { registeredCourses, addCourse, updateCourseStatus, removeCourse, getCompletedCreditsByCategory } = useCurriculumStore();

  const handleStatusChange = (courseId: string, status: string) => {
    if (status === "None") {
      removeCourse(courseId);
    } else if (registeredCourses[courseId]) {
      updateCourseStatus(courseId, status as CourseStatus);
    } else {
      addCourse(courseId, status as CourseStatus);
    }
  };

  const categories = Object.keys(CATEGORY_REQUIREMENTS) as CourseCategory[];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight">Curriculum</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage your courses, track category requirements, and update statuses.</p>
      </header>

      <div className="space-y-12">
        {categories.map((category, idx) => {
          const coursesInCategory = curriculumData.filter(c => c.category === category);
          if (coursesInCategory.length === 0) return null;

          const required = CATEGORY_REQUIREMENTS[category];
          const completed = getCompletedCreditsByCategory(category);
          const isComplete = completed >= required;

          return (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="glass border-0 overflow-hidden">
                <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      {category}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Credits: {completed} / {required}</span>
                      {isComplete && <Badge className="bg-chart-2/20 text-chart-2 hover:bg-chart-2/30 border-0">Requirement Met</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-full max-h-[400px]">
                    <Table>
                      <TableHeader className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="w-[100px] text-muted-foreground">Code</TableHead>
                          <TableHead className="text-muted-foreground">Course Title</TableHead>
                          <TableHead className="text-center w-[100px] text-muted-foreground">Credits</TableHead>
                          <TableHead className="w-[200px] text-muted-foreground">Basket</TableHead>
                          <TableHead className="w-[180px] text-right text-muted-foreground">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {coursesInCategory.map((course) => {
                          const status = registeredCourses[course.id]?.status || "Not Registered";
                          return (
                            <TableRow key={course.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-mono text-xs">{course.code}</TableCell>
                              <TableCell className="font-medium">{course.title}</TableCell>
                              <TableCell className="text-center">{course.credits}</TableCell>
                              <TableCell>
                                {course.basket && (
                                  <Badge variant="outline" className="border-white/10 text-muted-foreground bg-black/20 text-[10px]">
                                    {course.basket}
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Select 
                                  value={status === "Not Registered" ? "None" : status} 
                                  onValueChange={(val) => handleStatusChange(course.id, val || "None")}
                                >
                                  <SelectTrigger className={`w-full h-8 text-xs border ${getStatusColor(status === "Not Registered" ? undefined : status)}`}>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-background/95 backdrop-blur-xl border-white/10">
                                    <SelectItem value="None">Not Registered</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
