import { useSignIn } from "@clerk/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

/**
 * SocialLogin — reusable Google + GitHub OAuth buttons using Clerk.
 * @param {string} mode - "signIn" | "signUp"
 */
export default function SocialLogin({ mode = "signIn" }) {
  const { signIn } = useSignIn();

  const handleOAuth = async (strategy) => {
    try {
      await signIn?.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleOAuth("oauth_google")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all shadow-xs hover:shadow-sm"
        >
          <FcGoogle className="size-4" />
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("oauth_github")}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all shadow-xs hover:shadow-sm"
        >
          <FaGithub className="size-4 text-slate-800" />
          GitHub
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-wider">
          or {mode === "signIn" ? "sign in with email" : "sign up with email"}
        </span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
