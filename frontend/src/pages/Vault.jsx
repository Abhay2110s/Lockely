import { useState } from "react";
import {
  KeyRound,
  Search,
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Lock,
  Globe,
  CreditCard,
  FileText,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";

export default function Vault() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedField, setCopiedField] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock Vault Items state
  const [entries, setEntries] = useState([
    {
      id: "1",
      title: "GitHub Developer Account",
      username: "user@passguardian.dev",
      password: "SuperSecretPassword123!",
      url: "https://github.com",
      category: "Logins",
      updatedAt: "Today",
    },
    {
      id: "2",
      title: "Google Workspace Admin",
      username: "admin@company.com",
      password: "GoogleVaultKey$99",
      url: "https://google.com",
      category: "Logins",
      updatedAt: "2 days ago",
    },
    {
      id: "3",
      title: "Primary Credit Card",
      username: "4111 •••• •••• 9921",
      password: "CVV 882 - EXP 09/28",
      url: "https://chase.com",
      category: "Cards",
      updatedAt: "1 week ago",
    },
    {
      id: "4",
      title: "Server Recovery Master Keys",
      username: "Root Administrator",
      password: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...",
      url: "Internal Infra",
      category: "Notes",
      updatedAt: "2 weeks ago",
    },
  ]);

  const [newForm, setNewForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    category: "Logins",
  });

  const categories = [
    { label: "All Items", icon: KeyRound },
    { label: "Logins", icon: Globe },
    { label: "Cards", icon: CreditCard },
    { label: "Notes", icon: FileText },
  ];

  const handleCopy = (id, text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(`${id}-${fieldName}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newForm.title || !newForm.password) return;

    const newEntry = {
      id: Date.now().toString(),
      ...newForm,
      updatedAt: "Just now",
    };

    setEntries([newEntry, ...entries]);
    setNewForm({ title: "", username: "", password: "", url: "", category: "Logins" });
    setIsAddModalOpen(false);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesCat = activeCategory === "All" || entry.category === activeCategory;
    const matchesSearch =
      entry.title.toLowerCase().includes(search.toLowerCase()) ||
      entry.username.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Vault Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="size-6 text-indigo-600" />
            Encrypted Password Vault
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Store, search, and manage your encrypted login credentials safely.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-soft-primary inline-flex items-center justify-center gap-2 text-xs py-2.5 px-4 shadow-sm"
        >
          <Plus className="size-4" />
          Add New Vault Item
        </button>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === (cat.label === "All Items" ? "All" : cat.label);
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label === "All Items" ? "All" : cat.label)}
                className={`
                  flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
                  ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70"
                  }
                `}
              >
                <Icon className="size-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search credentials..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Vault Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map((item) => {
          const isPasswordVisible = showPasswordId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {item.title[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                    <p className="text-[0.7rem] text-slate-400 truncate">{item.url}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[0.65rem] font-semibold">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Username Field */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 text-[0.7rem] uppercase font-semibold">User:</span>
                <span className="font-mono text-slate-700 truncate">{item.username}</span>
                <button
                  onClick={() => handleCopy(item.id, item.username, "user")}
                  className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                  title="Copy Username"
                >
                  {copiedField === `${item.id}-user` ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                </button>
              </div>

              {/* Password Field */}
              <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-indigo-600 text-[0.7rem] uppercase font-semibold flex items-center gap-1">
                  <Lock className="size-3" /> Key:
                </span>
                <span className="font-mono text-slate-900 font-bold truncate">
                  {isPasswordVisible ? item.password : "••••••••••••••••"}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowPasswordId(isPasswordVisible ? null : item.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600"
                    title="Toggle Password Visibility"
                  >
                    {isPasswordVisible ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, item.password, "pass")}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600"
                    title="Copy Password"
                  >
                    {copiedField === `${item.id}-pass` ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredEntries.length === 0 && (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
            <ShieldAlert className="size-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No vault entries found</h3>
            <p className="text-xs text-slate-400">Try adjusting your search query or add a new entry.</p>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Add Vault Item</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Title / Account Name</label>
                <input
                  type="text"
                  required
                  value={newForm.title}
                  onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                  placeholder="e.g. GitHub Account"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Username / Email</label>
                <input
                  type="text"
                  value={newForm.username}
                  onChange={(e) => setNewForm({ ...newForm, username: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Password / Key</label>
                <input
                  type="password"
                  required
                  value={newForm.password}
                  onChange={(e) => setNewForm({ ...newForm, password: e.target.value })}
                  placeholder="Secret password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Website URL</label>
                <input
                  type="text"
                  value={newForm.url}
                  onChange={(e) => setNewForm({ ...newForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={newForm.category}
                  onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="Logins">Logins</option>
                  <option value="Cards">Cards</option>
                  <option value="Notes">Notes</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-soft-primary px-5 py-2 text-xs font-semibold shadow-sm"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
