"use client";

import { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { loginAsGuest } = useAuth();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animation
    gsap.fromTo(formCardRef.current, 
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "power3.out"
      }
    );

    // Subtle floating animation for the background blobs
    gsap.to(".bg-blob-1", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".bg-blob-2", {
      y: "random(-30, 30)",
      x: "random(-30, 30)",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });
  }, { scope: containerRef });

  // Animate error message when it appears/disappears
  useGSAP(() => {
    if (error && errorRef.current) {
      gsap.fromTo(errorRef.current,
        { opacity: 0, height: 0, scale: 0.95, marginBottom: 0 },
        { opacity: 1, height: "auto", scale: 1, marginBottom: 24, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle ambient background blobs */}
      <div className="bg-blob-1 absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="bg-blob-2 absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      
      <div
        ref={formCardRef}
        className="w-full max-w-md z-10 p-6 opacity-0"
      >
        <Card className="glass border-0">
          <CardHeader className="space-y-2 text-center pb-8">
            <CardTitle className="text-3xl font-semibold tracking-tight">Amity Dashboard</CardTitle>
            <CardDescription className="text-muted-foreground">Sign in to manage your B.Tech AIML degree</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div 
                  ref={errorRef}
                  className="p-3 text-sm text-destructive-foreground bg-destructive/20 rounded-md border border-destructive/30 overflow-hidden"
                >
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@student.amity.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary/50 transition-all h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/20 border-white/10 focus-visible:ring-primary focus-visible:border-primary/50 transition-all h-12"
                />
              </div>
              
              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all rounded-xl"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background/80 backdrop-blur-xl px-2 text-muted-foreground">
                      Or continue without account
                    </span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline"
                  onClick={loginAsGuest}
                  className="w-full h-12 text-sm font-medium border-white/10 hover:bg-white/5 transition-all rounded-xl"
                >
                  Guest Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
