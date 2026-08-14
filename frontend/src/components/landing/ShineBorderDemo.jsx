import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { Lock, Sparkles, CheckCircle2 } from "lucide-react";
import ShinyText from "@/components/animations/ShinyText";
import ScrollReveal from "@/components/animations/ScrollReveal";

export function ShineBorderDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="relative w-full max-w-[380px] rounded-[1.6rem] overflow-visible shadow-2xl p-[3px] mx-auto bg-white">
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <Card className="relative overflow-hidden border-slate-200/90 bg-white/95 backdrop-blur-md rounded-[1.4rem]">
      <CardHeader className="space-y-2 pb-4">
        <div className="size-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-1">
          <Lock className="size-5" />
        </div>
        <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">Login</CardTitle>
        <CardDescription className="text-xs text-slate-500 font-medium">
          Enter your credentials to access your zero-knowledge vault
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="demo-email">Email</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-slate-200 text-xs py-2.5"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="demo-password">Password</Label>
              <Input
                id="demo-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-slate-200 text-xs py-2.5"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-2">
        <Button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          {submitted ? (
            <>
              <CheckCircle2 className="size-4 text-emerald-300" /> Vault Key Verified!
            </>
          ) : (
            <>
              <Sparkles className="size-4" /> Sign In
            </>
          )}
        </Button>
        <p className="text-[0.7rem] text-slate-400 text-center font-medium">
          Client-side AES-256 GCM Key Derivation Active
        </p>
      </CardFooter>
      </Card>
    </div>
  );
}

export default function ShineBorderSection() {
  return (
    <section className="px-6 py-20 bg-slate-50/50 border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto space-y-10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-xs font-semibold text-indigo-700">
              <Sparkles className="size-3.5 text-indigo-600" />
              Interactive Login Feature
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Shine Border <ShinyText text="Credential Card" />
            </h2>
            <p className="text-sm text-slate-600">
              Experience the animated multi-color ShineBorder ring running on instant zero-knowledge form components.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <ShineBorderDemo />
        </ScrollReveal>
      </div>
    </section>
  );
}
