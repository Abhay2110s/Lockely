import { UserProfile, useUser } from "@clerk/react";
import { User, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Profile() {
  const { user } = useUser();
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isMissingKey =
    !PUBLISHABLE_KEY || PUBLISHABLE_KEY.includes("YOUR_CLERK_PUBLISHABLE_KEY");

  if (isMissingKey) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
              {user?.firstName ? user.firstName[0] : "U"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {user?.fullName || "Guardian User"}
              </h1>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="size-3.5" />
                {user?.primaryEmailAddress?.emailAddress || "user@passguardian.dev"}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3">
            <ShieldCheck className="size-6 text-indigo-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-indigo-950">Clerk Authentication Connected</p>
              <p className="text-[0.7rem] text-indigo-700">
                Add your live Clerk key in <code className="font-mono bg-white px-1 py-0.5 rounded">.env</code> to load the full Clerk UserProfile management widget.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-2">
      <UserProfile
        path="/profile"
        routing="path"
        appearance={{
          elements: {
            rootBox: "w-full max-w-4xl shadow-xl rounded-3xl",
            card: "shadow-xl border border-slate-200/80 rounded-3xl bg-white p-6 sm:p-8",
            navbar: "border-r border-slate-100",
            headerTitle: "text-slate-900 font-bold text-xl",
          },
        }}
      />
    </div>
  );
}
