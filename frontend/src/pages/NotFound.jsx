import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6 text-center">
      <div className="size-16 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 shadow-md shadow-indigo-500/10">
        <ShieldCheck className="size-8" />
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">404</h1>
      <p className="text-lg font-semibold text-slate-700 mt-2">Page Not Found</p>
      <p className="text-xs text-slate-500 max-w-sm mt-1">
        The vault page or resource you requested could not be located or has been relocated.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="btn-soft-primary px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="size-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
