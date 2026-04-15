import { useState } from "react";
import {
  LineChart,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const canManageUsers = hasPermission("route:admin");

  const stats = [
    {
      label: "Total Balance",
      value: "$425,600.00",
      change: "+12.5%",
      trending: "up",
    },
    {
      label: "Monthly Income",
      value: "$12,450.00",
      change: "+4.2%",
      trending: "up",
    },
    {
      label: "Portfolio Value",
      value: "$312,250.00",
      change: "-0.8%",
      trending: "down",
    },
    { label: "Assets Owned", value: "18", change: "+2", trending: "up" },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "Investment",
      amount: "-$5,000.00",
      status: "Completed",
      date: "Oct 12, 2023",
    },
    {
      id: 2,
      type: "Dividend",
      amount: "+$450.00",
      status: "Completed",
      date: "Oct 11, 2023",
    },
    {
      id: 3,
      type: "Withdrawal",
      amount: "-$1,200.00",
      status: "Pending",
      date: "Oct 10, 2023",
    },
    {
      id: 4,
      type: "Investment",
      amount: "-$2,500.00",
      status: "Completed",
      date: "Oct 08, 2023",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-xl">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              CompassWealth
            </span>
          </div>

          <nav className="space-y-1">
            {["Overview", "Portfolio", "Transactions", "Markets", "Goals"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.toLowerCase()
                      ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item === "Overview" && <LineChart className="w-4 h-4" />}
                  {item === "Portfolio" && <PieChartIcon className="w-4 h-4" />}
                  {item === "Transactions" && (
                    <TrendingUp className="w-4 h-4" />
                  )}
                  {item === "Markets" && <Search className="w-4 h-4" />}
                  {item === "Goals" && <Settings className="w-4 h-4" />}
                  {item}
                </button>
              ),
            )}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-sm font-medium">
                  {user?.username?.[0]?.toUpperCase() || ""}
                </span>
              </div>
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {user?.username || ""}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search assets, records..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-full px-6">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Hello, {user?.username}
              </h1>
              <p className="text-white/50 mt-1">
                Here's what's happening with your portfolio.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/10 text-white/80"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              {canManageUsers && (
                <Button
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users
                </Button>
              )}
              <Button
                variant="outline"
                className="border-white/10 text-white/80"
              >
                Last 30 Days
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="bg-white/5 border-white/10 p-6 hover:bg-white/[0.07] transition-all cursor-default group"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <div
                    className={`p-1.5 rounded-lg ${stat.trending === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                  >
                    {stat.trending === "up" ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span
                    className={`text-xs font-semibold ${stat.trending === "up" ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Chart Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 bg-white/5 border-white/10 p-6 min-h-[400px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">Portfolio Performance</h2>
                <div className="flex gap-4">
                  {["1D", "1W", "1M", "1Y", "All"].map((t) => (
                    <button
                      key={t}
                      className={`text-xs font-medium ${t === "1M" ? "text-emerald-400" : "text-white/40 hover:text-white/60"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center text-white/20 border-t border-white/5 pt-8">
                <div className="flex flex-col items-center">
                  <LineChart className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm">
                    Chart visualization would render here
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-6">
                Recent Transactions
              </h2>
              <div className="space-y-6 flex-1">
                {recentTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 -m-2 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <TrendingUp
                          className={`w-4 h-4 ${tx.amount.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.type}</p>
                        <p className="text-xs text-white/40">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${tx.amount.startsWith("+") ? "text-emerald-400" : "text-white"}`}
                      >
                        {tx.amount}
                      </p>
                      <p className="text-[10px] text-white/30 uppercase tracking-tighter">
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 text-xs font-semibold text-white/50 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                View All Activity
                <ChevronRight className="w-3 h-3" />
              </button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
