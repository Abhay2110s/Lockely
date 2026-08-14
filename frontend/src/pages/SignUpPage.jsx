import { SignUp } from "@clerk/react";

export default function SignUpPage() {
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
