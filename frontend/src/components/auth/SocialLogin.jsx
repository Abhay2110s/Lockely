import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

/**
 * SocialLogin — placeholder OAuth buttons (OAuth not yet wired to backend).
 * @param {string} mode - "signIn" | "signUp"
 */
export default function SocialLogin({ mode = "signIn" }) {
  const handleOAuth = (provider) => {
    // TODO: Wire up server-side OAuth (Google / GitHub) when backend supports it.
    console.warn(`OAuth with ${provider} is not yet configured.`);
  };

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          disabled
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 text-xs font-semibold cursor-not-allowed opacity-50"
        >
          <FcGoogle className="size-4" />
          Google
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("github")}
          disabled
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 text-xs font-semibold cursor-not-allowed opacity-50"
        >
          <FaGithub className="size-4 text-slate-400" />
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
