import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Background glowing blobs for Apple aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[150px] pointer-events-none" />

      <Sidebar />
      <div className="flex-1 ml-64 overflow-y-auto">
        <main className="p-8 pb-20 max-w-7xl mx-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
