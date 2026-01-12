import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone, ChevronDown, Clock } from 'lucide-react';
import { MAIN_MENU } from '../constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date like: "Chủ nhật, 11/1/2026 11:07:20 PM"
  const getFormattedDateTime = (date: Date) => {
    const days = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[date.getDay()];
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const timeStr = date.toLocaleTimeString('en-US', { hour12: true }); // e.g., 11:07:20 PM
    return `${dayName}, ${d}/${m}/${y} ${timeStr}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans">
      {/* Top Bar - Governmental Style */}
      <div className="bg-primary-700 text-white py-2 text-[11px] md:text-xs hidden md:block border-b border-primary-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Date Time Display */}
            <span className="font-medium text-primary-100 flex items-center">
               {getFormattedDateTime(currentTime)}
            </span>
            
            <span className="opacity-30">|</span>

            {/* Hotline */}
            <span className="flex items-center font-bold text-white hover:text-yellow-300 transition-colors cursor-pointer">
                <Phone size={14} className="mr-1.5 animate-pulse" /> 
                ĐƯỜNG DÂY NÓNG SỞ Y TẾ: 02439985765/ 0967981616
            </span>
          </div>

          <div className="flex items-center space-x-4 font-medium">
            <Link to="/login" className="hover:text-primary-200 transition">Đăng nhập cán bộ</Link>
            <span className="opacity-30">|</span>
            <Link to="/citizen" className="hover:text-primary-200 transition">Cổng công dân</Link>
          </div>
        </div>
      </div>

      {/* Main Header Area - Increased Height (py-9 instead of py-6) */}
      <div className="bg-white py-9 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Logo & Branding Section */}
            <Link to="/" className="flex items-center gap-5 group">
              {/* Logo Icon - Official Ministry of Health Logo */}
              <div className="flex-shrink-0 relative">
                 <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center overflow-visible transition-transform duration-300">
                    <img 
                      src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" 
                      alt="Logo Sở Y Tế Hà Nội" 
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                 </div>
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-xs md:text-sm font-bold text-gray-600 uppercase tracking-wide leading-tight hidden md:block mb-1">
                  CỔNG THÔNG TIN ĐIỆN TỬ SỞ Y TẾ HÀ NỘI
                </h2>
                <h1 className="text-xl md:text-4xl font-extrabold text-[#d32f2f] uppercase leading-none py-1 tracking-tight group-hover:text-red-700 transition-colors" style={{fontFamily: 'Roboto, sans-serif'}}>
                  SỨC KHỎE THỦ ĐÔ
                </h1>
                <p className="text-xs md:text-sm text-[#1e3a8a] font-bold mt-1 hidden md:block">
                  Kênh thông tin y tế chính thống của Sở Y tế Hà Nội
                </p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md justify-end">
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm thông tin y tế..." 
                  className="w-full pl-5 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm shadow-inner"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors flex items-center justify-center shadow-md">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden absolute top-4 right-4 text-gray-700 p-2 bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop & Mobile */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block bg-gradient-to-r from-primary-800 to-primary-900 text-white transition-all duration-300 shadow-lg border-t border-primary-600`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col lg:flex-row lg:items-center justify-between py-2 lg:py-0">
            {MAIN_MENU.map((item) => {
               const isActive = location.pathname.startsWith(item.path) && item.path !== '/';
               const isHomeActive = item.path === '/' && location.pathname === '/';
               const hasChildren = item.children && item.children.length > 0;
               
               return (
                <li key={item.id} className="relative group lg:static xl:relative">
                  {hasChildren ? (
                    <>
                        <div 
                            className={`
                                flex items-center justify-between cursor-pointer px-3 py-3.5 text-[13px] uppercase font-bold border-b-4 border-transparent hover:bg-white/10 hover:border-secondary-400 transition-all
                                ${(isActive || isHomeActive) ? 'bg-white/10 border-secondary-500 text-secondary-300' : 'text-gray-100'}
                            `}
                        >
                             <Link 
                                to={item.path} 
                                className="flex-grow tracking-wide"
                                onClick={() => setIsMenuOpen(false)}
                             >
                                {item.title}
                             </Link>
                             <ChevronDown size={14} className="ml-1 lg:block hidden group-hover:rotate-180 transition-transform duration-200 opacity-70" />
                             <ChevronDown size={14} className="ml-1 lg:hidden opacity-70" />
                        </div>
                        
                        {/* Dropdown Menu */}
                        <div className="hidden lg:group-hover:block absolute left-0 top-full bg-white shadow-2xl rounded-b-lg w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200 border-t-4 border-secondary-500 ring-1 ring-black/5">
                             <ul className="py-2">
                                {item.children?.map(child => (
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
                        {/* Mobile Submenu (Always visible or simpler) */}
                        <div className="lg:hidden pl-4 bg-black/20 border-l-2 border-white/10 ml-3 my-1">
                            {item.children?.map(child => (
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
                        ${(isActive || isHomeActive) ? 'bg-white/10 border-secondary-500 text-secondary-300' : 'text-gray-100'}
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
    </header>
  );
};

export default Header;