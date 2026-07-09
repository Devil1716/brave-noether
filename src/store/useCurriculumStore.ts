import { create } from "zustand";
import { persist } from "zustand/middleware";
import { curriculumData, Course } from "@/data/curriculum";

export type CourseStatus = "Completed" | "In Progress" | "Not Registered";

export interface StudentCourse extends Course {
  status: CourseStatus;
  grade?: string;
  semester?: number;
}

interface CurriculumState {
  registeredCourses: Record<string, StudentCourse>;
  addCourse: (courseId: string, status: CourseStatus, semester?: number) => void;
  updateCourseStatus: (courseId: string, status: CourseStatus, grade?: string) => void;
  removeCourse: (courseId: string) => void;
  getCompletedCredits: () => number;
  getInProgressCredits: () => number;
  getRemainingCredits: () => number;
  getCompletedCreditsByCategory: (category: string) => number;
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set, get) => ({
      registeredCourses: {},
      
      addCourse: (courseId, status, semester) => {
        const course = curriculumData.find((c) => c.id === courseId);
        if (!course) return;
        
        set((state) => ({
          registeredCourses: {
            ...state.registeredCourses,
            [courseId]: { ...course, status, semester }
          }
        }));
      },

      updateCourseStatus: (courseId, status, grade) => {
        set((state) => {
          const course = state.registeredCourses[courseId];
          if (!course) return state;
          
          return {
            registeredCourses: {
              ...state.registeredCourses,
              [courseId]: { ...course, status, grade }
            }
          };
        });
      },

      removeCourse: (courseId) => {
        set((state) => {
          const newCourses = { ...state.registeredCourses };
          delete newCourses[courseId];
          return { registeredCourses: newCourses };
        });
      },

      getCompletedCredits: () => {
        const { registeredCourses } = get();
        return Object.values(registeredCourses)
          .filter(c => c.status === "Completed")
          .reduce((total, c) => total + c.credits, 0);
      },

      getInProgressCredits: () => {
        const { registeredCourses } = get();
        return Object.values(registeredCourses)
          .filter(c => c.status === "In Progress")
          .reduce((total, c) => total + c.credits, 0);
      },

      getRemainingCredits: () => {
        const completed = get().getCompletedCredits();
        return Math.max(0, 160 - completed);
      },

      getCompletedCreditsByCategory: (category) => {
        const { registeredCourses } = get();
        return Object.values(registeredCourses)
          .filter(c => c.status === "Completed" && c.category === category)
          .reduce((total, c) => total + c.credits, 0);
      }
    }),
    {
      name: "curriculum-storage",
    }
  )
);
