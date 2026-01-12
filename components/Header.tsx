import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Phone,
  ChevronDown,
  LogOut,
  User,
  PlusCircle,
  Send,
} from "lucide-react";
import { MAIN_MENU } from "../constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập
  const checkAuth = () => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setUserName(localStorage.getItem("userName") || "");
  };

  useEffect(() => {
    checkAuth();

    // Lắng nghe sự kiện thay đổi auth từ Login.tsx
    window.addEventListener("auth-change", checkAuth);
    // Lắng nghe sự kiện storage (cho các tab khác)
    window.addEventListener("storage", checkAuth);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
      clearInterval(timer);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
  };

  const getFormattedDateTime = (date: Date) => {
    const days = [
      "Chủ nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    return `${days[date.getDay()]}, ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.toLocaleTimeString("vi-VN")}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2 text-[11px] md:text-xs border-b border-primary-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-medium text-primary-100 hidden md:inline-block">
              {getFormattedDateTime(currentTime)}
            </span>
            <span className="opacity-30 hidden md:inline-block">|</span>
            <span className="flex items-center font-bold text-white hover:text-yellow-300 transition-colors cursor-pointer text-[10px] md:text-xs">
              <Phone size={14} className="mr-1.5 animate-pulse" />
              ĐƯỜNG DÂY NÓNG SỞ Y TẾ: 02439985765/ 0967981616
            </span>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4 font-medium">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-secondary-300">
                  <User size={12} /> Chào, {userName}
                </span>
                <button
                  onClick={() => setIsPostModalOpen(true)}
                  className="flex items-center gap-1 bg-secondary-500 hover:bg-secondary-600 px-2.5 py-1 rounded font-bold text-white transition-all shadow-lg text-[10px] md:text-xs"
                >
                  <PlusCircle size={14} /> ĐĂNG TIN
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:text-red-300 transition text-[10px] md:text-xs"
                >
                  <LogOut size={14} /> Thoát
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-200 transition">
                  Đăng nhập cán bộ
                </Link>
                <span className="opacity-30">|</span>
                <Link
                  to="/citizen"
                  className="hover:text-primary-200 transition"
                >
                  Cổng công dân
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Branding */}
      <div className="bg-white py-6 md:py-8 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-4 group">
              <img
                src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png"
                alt="Logo Sở Y Tế"
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <h2 className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:block">
                  CỔNG THÔNG TIN ĐIỆN TỬ SỞ Y TẾ HÀ NỘI
                </h2>
                <h1 className="text-xl md:text-3xl font-black text-[#d32f2f] uppercase leading-none py-1 group-hover:text-red-700 transition-colors">
                  SỨC KHỎE THỦ ĐÔ
                </h1>
                <p className="text-[11px] md:text-sm text-primary-800 font-bold italic">
                  Chuyên nghiệp - Tận tâm - Vì sức khỏe nhân dân
                </p>
              </div>
            </Link>
            <div
              className="ads-zone-group zonegroup-vertical"
              id="ads-zone-37"
              data-id="37"
              data-type="vertical"
              data-position="mangset"
              data-timeflip="2000"
            >
              <div className="ads-block-item text-center ">
                <a
                  href="https://baoquangninh.vn/ads-tracking?aid=284&amp;cmpid=284&amp;alink=284"
                  target=""
                >
                  <img
                    src="https://media.baoquangninh.vn/upload/image/202511/original/b38ecbf2b29402f0ee5f03bbf4eb102d.gif"
                    width=""
                    height=""
                    alt="Advertisement"
                  />
                </a>
              </div>
            </div>
            <div className="hidden lg:flex items-center flex-1 max-w-sm justify-end">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Tìm kiếm thông tin..."
                  className="w-full pl-5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all text-sm"
                />
                <button className="absolute right-1 top-1 bottom-1 px-4 bg-primary-600 text-white rounded-full hover:bg-primary-700">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <button
              className="lg:hidden absolute top-4 right-4 text-gray-700 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:block bg-gradient-to-r from-primary-800 to-primary-900 text-white transition-all duration-300 shadow-lg border-t border-primary-600`}
      >
        <div className="container mx-auto px-4">
          <ul className="flex flex-col lg:flex-row lg:items-center justify-between py-2 lg:py-0">
            {MAIN_MENU.map((item) => {
              const isActive =
                location.pathname.startsWith(item.path) && item.path !== "/";
              const isHomeActive =
                item.path === "/" && location.pathname === "/";
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li
                  key={item.id}
                  className="relative group lg:static xl:relative"
                >
                  {hasChildren ? (
                    <>
                      <div
                        className={`
                                flex items-center justify-between cursor-pointer px-3 py-3.5 text-[13px] uppercase font-bold border-b-4 border-transparent hover:bg-white/10 hover:border-secondary-400 transition-all
                                ${
                                  isActive || isHomeActive
                                    ? "bg-white/10 border-secondary-500 text-secondary-300"
                                    : "text-gray-100"
                                }
                            `}
                      >
                        <Link
                          to={item.path}
                          className="flex-grow tracking-wide"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                        <ChevronDown
                          size={14}
                          className="ml-1 lg:block hidden group-hover:rotate-180 transition-transform duration-200 opacity-70"
                        />
                        <ChevronDown
                          size={14}
                          className="ml-1 lg:hidden opacity-70"
                        />
                      </div>

                      {/* Dropdown Menu - Increased width (w-72) for better readability */}
                      <div className="hidden lg:group-hover:block absolute left-0 top-full bg-white shadow-2xl rounded-b-lg w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border-t-4 border-secondary-500 ring-1 ring-black/5">
                        <ul className="py-2">
                          {item.children?.map((child) => (
                            <li key={child.id}>
                              <Link
                                to={child.path}
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-700 border-l-4 border-transparent hover:border-primary-500 transition-all"
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Mobile Submenu */}
                      <div className="lg:hidden pl-4 bg-black/20 border-l-2 border-white/10 ml-3 my-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.id}
                            to={child.path}
                            className="block px-3 py-2 text-xs text-gray-300 hover:text-white font-medium"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-3 py-3.5 text-[13px] uppercase font-bold border-b-4 border-transparent hover:bg-white/10 hover:border-secondary-400 transition-all tracking-wide
                        ${
                          isActive || isHomeActive
                            ? "bg-white/10 border-secondary-500 text-secondary-300"
                            : "text-gray-100"
                        }
                        `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Quick Post Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-primary-700 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <PlusCircle size={20} /> SOẠN THẢO TIN TỨC MỚI
              </h3>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Tiêu đề bài viết
                </label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề tin tức..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Chuyên mục
                  </label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                    <option>Tin tức - Sự kiện</option>
                    <option>Cảnh báo y tế</option>
                    <option>Chuyển đổi số</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Hình ảnh đại diện
                  </label>
                  <input
                    type="file"
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Nội dung tóm tắt
                </label>
                <textarea
                  rows={2}
                  placeholder="Mô tả ngắn gọn về tin tức..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Nội dung chi tiết
                </label>
                <textarea
                  rows={6}
                  placeholder="Nội dung đầy đủ của bài viết..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    alert("Đã gửi bài viết lên hệ thống chờ phê duyệt!");
                    setIsPostModalOpen(false);
                  }}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <Send size={18} /> ĐĂNG BÀI NGAY
                </button>
                <button
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-xl transition-all"
                >
                  HỦY BỎ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
