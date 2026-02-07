import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

function SidebarLayout({ children }) {
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 text-2xl font-bold text-blue-600 dark:text-blue-400 border-b dark:border-gray-700">
          SkillSwap
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <NavLink to="/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/matches" className={linkClass}>
            <Users size={18} />
            <span>Matches</span>
          </NavLink>

          <NavLink to="/chats" className={linkClass}>
            <MessageSquare size={18} />
            <span>Chats</span>
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            <User size={18} />
            <span>Profile</span>
          </NavLink>
        </nav>

        {/* Theme Toggle */}
        <div className="px-4 pb-2">
          <ThemeToggle />
        </div>

        {/* Logout */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8 overflow-y-auto text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900">
        {children}
      </main>
    </div>
  );
}

export default SidebarLayout;
