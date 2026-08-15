import { Link } from "react-router-dom";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6 text-center">
      {/* Icon */}
      <div className="relative mb-8">
        <div className="size-20 rounded-3xl bg-rose-100 text-rose-500 flex items-center justify-center shadow-lg shadow-rose-200/50">
          <ShieldX className="size-10" />
        </div>
        <div className="absolute -top-1 -right-1 size-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs font-black shadow-md">
          !
        </div>
      </div>

      {/* Text */}
      <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight">403</h1>
      <p className="text-xl font-bold text-slate-700 mt-3">Access Denied</p>
      <p className="text-sm text-slate-500 max-w-sm mt-2 leading-relaxed">
        You don't have permission to access this vault resource. This area requires elevated privileges or authentication.
      </p>

      {/* Security badge */}
      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold">
        <ShieldX className="size-3.5" />
        Zero-Knowledge Access Control — Permission Denied
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="btn-soft-primary px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
        >
          <Home className="size-4" /> Return to Home
        </Link>
        <button
          onClick={() => history.back()}
          className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors shadow-xs"
        >
          <ArrowLeft className="size-4" /> Go Back
        </button>
      </div>
    </div>
  );
}
