export type CourseCategory = "School Core" | "Program Core" | "Common Elective" | "Specialized Elective" | "Open Elective";

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  category: CourseCategory;
  basket?: string; // For specialized electives
  prerequisites?: string[];
}

export const Baskets = {
  "AI_ML": { name: "Artificial Intelligence and Machine Learning", required: 6 },
  "Cyber_Security": { name: "Cyber Security", required: 3 },
  "Data_Analytics": { name: "Data Analytics", required: 3 },
  "IoT": { name: "IoT", required: 0 },
  "Cloud_Computing": { name: "Cloud Computing", required: 0 },
  "Robotics": { name: "Robotics", required: 3 },
  "Big_Data": { name: "Big Data", required: 0 },
  "Fullstack": { name: "Fullstack Engineering", required: 0 },
  "DevOps": { name: "DevOps", required: 3 },
};

export const curriculumData: Course[] = [
  // School Core (Sample from provided data)
  { id: "c1", code: "CSE1005", title: "Programming in Python", credits: 2, category: "School Core" },
  { id: "c2", code: "CSE1003", title: "Programming in Java", credits: 2, category: "School Core" },
  { id: "c3", code: "CSE1014", title: "Introduction to C Programming", credits: 3, category: "School Core" },
  { id: "c4", code: "CSE1015", title: "C Programming Laboratory", credits: 1, category: "School Core" },
  { id: "c5", code: "CSE2001", title: "Data Structures and Algorithms", credits: 4, category: "School Core" },
  { id: "c6", code: "MAT1002", title: "Differential Equations and Transform Techniques", credits: 3, category: "School Core" },
  { id: "c7", code: "MAT1006", title: "Engineering Mathematics-1", credits: 4, category: "School Core" },
  { id: "c8", code: "CHE1004", title: "Environmental Studies", credits: 4, category: "School Core" },
  { id: "c9", code: "CSE4001", title: "B.Tech. Capstone Project", credits: 4, category: "School Core" },
  { id: "c10", code: "CSE4002", title: "B.Tech. Internship", credits: 6, category: "School Core" },
  { id: "c11", code: "ECE1001", title: "Fundamentals of Electrical and Electronics Engineering", credits: 4, category: "School Core" },
  
  // Program Core (43 Credits required)
  { id: "p1", code: "CSE1006", title: "Software Engineering", credits: 3, category: "Program Core" },
  { id: "p2", code: "CSE2002", title: "Web Technology", credits: 3, category: "Program Core" },
  { id: "p3", code: "CSE2003", title: "Design and Analysis of Algorithms", credits: 3, category: "Program Core" },
  { id: "p4", code: "CSE2004", title: "Computer Architecture and Organization", credits: 3, category: "Program Core" },
  { id: "p5", code: "CSE2005", title: "Operating Systems", credits: 3, category: "Program Core" },
  { id: "p6", code: "CSE2006", title: "Communication Networks", credits: 3, category: "Program Core" },
  { id: "p7", code: "CSE2007", title: "Relational Database Management System", credits: 3, category: "Program Core" },
  { id: "p8", code: "CSE1035", title: "Fundamentals of Artificial Intelligence and Machine Learning", credits: 3, category: "Program Core" },
  { id: "p9", code: "CSE3011", title: "Machine Learning Techniques", credits: 3, category: "Program Core" },

  // Specialized Electives
  { id: "s1", code: "CSE3010", title: "AI & ML Applications", credits: 3, category: "Specialized Elective", basket: "Artificial Intelligence and Machine Learning" },
  { id: "s2", code: "CSE3015", title: "Natural Language Processing", credits: 3, category: "Specialized Elective", basket: "Artificial Intelligence and Machine Learning" },
  { id: "s3", code: "CSE3013", title: "Deep Neural Networks", credits: 3, category: "Specialized Elective", basket: "Artificial Intelligence and Machine Learning" },
  
  { id: "s4", code: "CSE3022", title: "Intrusion Detection and Prevention System", credits: 3, category: "Specialized Elective", basket: "Cyber Security" },
  { id: "s5", code: "CSE3021", title: "Ethical Hacking", credits: 3, category: "Specialized Elective", basket: "Cyber Security" },
  
  { id: "s6", code: "CSE2028", title: "Big Data Analytics", credits: 3, category: "Specialized Elective", basket: "Data Analytics" },
  { id: "s7", code: "CSE2029", title: "Business Analytics Fundamentals", credits: 3, category: "Specialized Elective", basket: "Data Analytics" },

  { id: "s8", code: "ECE5002", title: "Principles of Robotics and RoS", credits: 3, category: "Specialized Elective", basket: "Robotics" },
  
  { id: "s9", code: "CSE2035", title: "DevOps", credits: 3, category: "Specialized Elective", basket: "DevOps" },

  // Common Electives
  { id: "ce1", code: "CSE1009", title: "Linux Internals", credits: 3, category: "Common Elective" },
  { id: "ce2", code: "CSE2012", title: "Advanced Database Management System", credits: 3, category: "Common Elective" },
  { id: "ce3", code: "CSE2017", title: "UI/UX", credits: 3, category: "Common Elective" },
  { id: "ce4", code: "CSE2010", title: "Mobile Application Development", credits: 3, category: "Common Elective" },
];

export const TOTAL_REQUIRED_CREDITS = 160;
export const CATEGORY_REQUIREMENTS = {
  "School Core": 62,
  "Program Core": 43,
  "Common Elective": 21,
  "Specialized Elective": 16,
  "Open Elective": 18
};
