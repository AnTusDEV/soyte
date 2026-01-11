
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Phone, ChevronDown, User, LogOut, FilePlus } from 'lucide-react';
import { MAIN_MENU } from '../constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md font-sans">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-1.5 text-xs md:text-sm hidden md:block border-b border-primary-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Phone size={14} className="mr-1" /> Đường dây nóng: 1900-9095</span>
            <span className="opacity-30">|</span>
            <span>📧 vanthu_soyt@hanoi.gov.vn</span>
          </div>
          <div className="flex items-center space-x-4 font-medium">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/admin/news/new" className="bg-secondary-600 hover:bg-secondary-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1.5 transition shadow-sm font-bold">
                  <FilePlus size={14} /> Viết bài mới
                </Link>
                <div className="flex items-center gap-2 group relative">
                   <User size={14} /> 
                   <span>Chào, {localStorage.getItem('userName')}</span>
                   <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-300 ml-2 transition">
                     <LogOut size={14} /> Thoát
                   </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary-200 transition">Đăng nhập cán bộ</Link>
                <span className="opacity-30">|</span>
                <Link to="/citizen" className="hover:text-primary-200 transition">Cổng công dân</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="bg-white py-3 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <Link to="/" className="flex items-center gap-4 group">
              <div className="flex-shrink-0 relative">
                 <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-visible transition-transform duration-300">
                    <img 
                      src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" 
                      alt="Logo Sở Y Tế Hà Nội" 
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                 </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-[11px] md:text-sm font-bold text-gray-600 uppercase tracking-wide leading-tight hidden md:block mb-0.5">
                  CỔNG THÔNG TIN ĐIỆN TỬ SỞ Y TẾ HÀ NỘI
                </h2>
                <h1 className="text-xl md:text-3xl font-extrabold text-[#d32f2f] uppercase leading-none py-0.5 tracking-tight group-hover:text-red-700 transition-colors">
                  SỨC KHỎE THỦ ĐÔ
                </h1>
                <p className="text-[11px] md:text-sm text-[#1e3a8a] font-bold mt-0.5 hidden md:block">
                  Kênh thông tin y tế chính thống của Sở Y tế Hà Nội
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center flex-1 max-w-md justify-end">
              <div className="relative w-full group">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm thông tin y tế..." 
                  className="w-full pl-5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all text-sm shadow-inner"
                />
                <button className="absolute right-1 top-1 bottom-1 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors flex items-center justify-center shadow-md">
                  <Search size={18} />
                </button>
              </div>
            </div>

            <button 
              className="lg:hidden absolute top-4 right-4 text-gray-700 p-2 bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
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
