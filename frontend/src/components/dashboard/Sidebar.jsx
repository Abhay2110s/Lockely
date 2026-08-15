import { Link, NavLink, useLocation } from "react-router-dom";
import { useUser } from "@clerk/react";
import {
  ShieldCheck,
  LayoutDashboard,
  KeyRound,
  Wand2,
  User,
  Settings,
  X,
  Lock,
  CheckCircle2,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Password Vault", href: "/vault", icon: KeyRound },
  { label: "Generator", href: "/generator", icon: Wand2 },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

/**
 * Sidebar — standalone sidebar component for the dashboard layout.
 * @param {boolean} mobileOpen - whether sidebar is visible on mobile
 * @param {Function} onClose - close handler for mobile
 */
export default function Sidebar({ mobileOpen, onClose }) {
  const { user } = useUser();
  const location = useLocation();

  return (
    <aside
      className={`
        fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        h-screen overflow-y-auto
      `}
    >
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <ShieldCheck className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900">
                PassGuardian
              </span>
              <span className="text-[0.6rem] font-semibold tracking-wider text-slate-400 uppercase">
                Encrypted Vault
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="p-4 mx-3 my-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
          <div className="size-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
            {user?.firstName?.[0]?.toUpperCase() || "G"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {user?.fullName || user?.primaryEmailAddress?.emailAddress || "Guardian User"}
            </p>
            <p className="text-[0.65rem] text-indigo-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="size-3" /> Encrypted Session
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }
                `}
              >
                <Icon className={`size-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Security Badge Footer */}
      <div className="p-4 border-t border-slate-100">
        <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-2.5">
          <div className="size-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Lock className="size-3.5" />
          </div>
          <div>
            <p className="text-[0.7rem] font-bold text-indigo-950">Zero-Knowledge</p>
            <p className="text-[0.62rem] text-indigo-700/80">AES-256 Bit Encryption</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
