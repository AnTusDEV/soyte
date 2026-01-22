import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, LayoutDashboard, User } from "lucide-react"; // Add User icon
import { useAuth } from "../AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="px-6 py-4 flex items-center gap-4 border-b border-white/10">
          <div className="bg-white/10 p-2 rounded-lg">
            <LayoutDashboard size={24} className="text-secondary-400" />
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tight">
              Quản trị
            </h1>
            <p className="text-[10px] text-primary-200 font-bold uppercase tracking-widest">
              Sở Y tế Hà Nội
            </p>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <ul>
            <li>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors"
              >
                <LayoutDashboard size={18} />
                <span>Quản lý bài viết</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-white/10 transition-colors"
              >
                <User size={18} />
                <span>Quản lý người dùng</span>
              </Link>
            </li>
          </ul>
        </nav> 
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Admin Top Header */}
        <div className="bg-white px-8 py-4 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-gray-800">{title}</h1>
            {subtitle && <p className="text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition text-sm font-bold text-gray-700"
            >
              <Home size={18} /> Trang chủ
            </Link>
            <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-2 rounded-lg text-sm font-bold text-gray-700">
              <User size={18} /> {user?.full_name || user?.email?.split("@")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition text-sm font-bold text-white shadow-lg"
            >
              <LogOut size={18} /> Thoát
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 flex-grow">
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
