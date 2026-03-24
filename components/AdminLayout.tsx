import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LogOut, LayoutDashboard, User, ChevronDown, Key, Settings } from "lucide-react";
import { useAuth } from "../AuthContext";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { TieredMenu } from "primereact/tieredmenu";
import { Button } from "@/components/prime";
import { adminMenu, type MenuItem } from "../adminMenu";
import UserInfoModal from "./UserInfoModal";
import { useRef } from "react";

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
  const location = useLocation();
  const { logout, user } = useAuth();
  const menu = useRef<TieredMenu>(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const profileMenuItems = [
    {
      label: "Thông tin cá nhân",
      icon: <User size={16} className="mr-2" />,
      command: () => setShowUserInfo(true),
    },
    {
      label: "Đổi mật khẩu",
      icon: "pi pi-key",
      command: () => navigate("/change-password"),
    },
    { separator: true },
    {
      label: "Thoát hệ thống",
      icon: <LogOut size={16} className="mr-2 text-red-500" />,
      command: handleLogout,
      template: (item: any, options: any) => (
        <button
          onClick={options.onClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 w-full transition-colors"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ),
    },
  ];

  const getDefaultOpenMenus = (): Record<string, boolean> => {
    const result: Record<string, boolean> = {};

    adminMenu.forEach((item) => {
      if (item.children?.length) {
        result[item.key] = item.children.some(
          (child) => location.pathname === child.to,
        );
      }
    });

    return result;
  };

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(
    getDefaultOpenMenus(),
  );

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isActiveLink = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.to) return location.pathname === item.to;

    if (item.children?.length) {
      return item.children.some((child) => location.pathname === child.to);
    }

    return false;
  };

  const checkPermission = (itemPermission?: string) => {
    // if (user?.role === "admin") return true;
    if (!itemPermission) return true;
    return user?.permissions?.includes(itemPermission);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <Toast />
      <ConfirmDialog />

      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-primary-900 text-white shadow-2xl">
        <div className="flex items-center gap-4 border-b border-white/10 px-6 py-4">
          <div className="rounded-lg bg-white/10 p-2">
            <LayoutDashboard size={24} className="text-secondary-400" />
          </div>

          <div>
            <h1 className="text-lg font-black uppercase tracking-tight">
              Quản trị
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-200">
              Sở Y tế Hà Nội
            </p>
          </div>
        </div>

        <nav className="flex-grow p-4">
          <ul className="space-y-1">
            {adminMenu
              .filter((item) => checkPermission(item.permission))
              .map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);
                const isOpen = Boolean(openMenus[item.key]);
                const parentActive = isParentActive(item);

                return (
                  <li key={item.key}>
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleMenu(item.key)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${parentActive
                              ? "bg-white/10 text-white"
                              : "text-white hover:bg-white/10"
                            }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} />
                            <span>{item.label}</span>
                          </span>

                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${isOpen
                              ? "mt-1 max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          <ul className="ml-6 flex flex-col gap-1">
                            {item.children?.map((child) => {
                              const childActive = isActiveLink(child.to);

                              return (
                                <li key={child.key}>
                                  <Link
                                    to={child.to}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${childActive
                                        ? "bg-white/10 font-semibold text-white"
                                        : "text-white/90 hover:bg-white/10 hover:text-white"
                                      }`}
                                  >
                                    {child.label}

                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        to={item.to || "#"}
                        className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${parentActive
                            ? "bg-white/10 text-white"
                            : "text-white hover:bg-white/10"
                          }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
          </ul>
        </nav>
      </aside>

      <main className="flex min-w-0 flex-grow flex-col">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black text-gray-800">{title}</h1>
            {subtitle && <p className="mt-0.5 text-gray-500">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 transition hover:bg-gray-100"
            >
              <Home size={18} />
              <span>Trang chủ</span>
            </Link>

            <TieredMenu model={profileMenuItems} popup ref={menu} breakpoint="767px" className="rounded-xl shadow-2xl border-none ring-1 ring-black/5 p-1" />
            
            <button
              onClick={(e) => menu.current?.toggle(e)}
              className="flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm font-bold text-gray-700 transition-all border border-gray-200/50 group"
            >
              <User size={18} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
              <span>{user?.full_name || user?.email?.split("@")[0]}</span>
              <ChevronDown size={14} className="opacity-50" />
            </button>

            <Button
              onClick={handleLogout}
              icon={<LogOut size={18} />}
              label="Thoát"
              className="gap-2 px-3 py-2 text-sm text-red-500 hover:!bg-red-700 hover:text-white border-none shadow-none"
            />
          </div>
        </div>

        <div className="flex-grow p-8">
          <div>{children}</div>
        </div>

        {/* Modals */}
        <UserInfoModal 
          visible={showUserInfo} 
          onHide={() => setShowUserInfo(false)} 
          user={user} 
        />
      </main>
    </div>
  );
};

export default AdminLayout;
