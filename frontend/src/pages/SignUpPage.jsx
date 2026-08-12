import { SignUp } from "@clerk/react";
import { AlertTriangle } from "lucide-react";

export default function SignUpPage() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isMissingKey =
    !PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes("YOUR_CLERK_PUBLISHABLE_KEY");

  if (isMissingKey) {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-amber-200 shadow-xl text-slate-900 space-y-6">
        <div className="size-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
          <AlertTriangle className="size-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Clerk Auth Setup Needed</h2>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Please add your Clerk Publishable Key in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-amber-700 font-mono text-[0.75rem]">frontend/.env</code>:
          </p>
          <div className="mt-3 p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto">
            VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
          </div>
        </div>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">Need a key?</span>
          <a
            href="https://dashboard.clerk.com"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Open Clerk Dashboard &rarr;
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "w-full shadow-xl rounded-3xl",
            card: "shadow-xl border border-slate-200/80 rounded-3xl bg-white/95 backdrop-blur-md p-8",
            headerTitle: "text-slate-900 font-bold text-2xl tracking-tight",
            headerSubtitle: "text-slate-500 text-xs",
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-3 rounded-xl shadow-md shadow-indigo-500/20 transition-all",
            socialButtonsBlockButton:
              "border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-xl py-2.5",
            footerActionLink: "text-indigo-600 font-semibold hover:text-indigo-700",
          },
        }}
      />
    </div>
  );
}
