import { UserProfile } from "@clerk/react";

export default function Profile() {
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
