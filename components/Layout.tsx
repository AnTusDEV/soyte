
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation(); 
  const isCMSPage = location.pathname.startsWith('/admin') || location.pathname.startsWith('/login');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Chỉ hiển thị Header nếu KHÔNG phải là trang CMS */}
      {!isCMSPage && <Header />}
      
      <main className={`flex-grow ${isCMSPage ? 'bg-gray-50' : ''}`}>
        {children}
      </main>
      
      {/* Chỉ hiển thị Footer nếu KHÔNG phải là trang CMS */}
      {!isCMSPage && <Footer />}
    </div>
  );
};

export default Layout;
