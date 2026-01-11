import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, Phone, Siren } from 'lucide-react';
import { SERVICE_CATEGORIES, MOCK_NEWS } from '../constants';

const Home = () => {
  const featuredNews = MOCK_NEWS[0];
  const sideNews = MOCK_NEWS.slice(1, 4);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {/* --- EMERGENCY FLOATING BUTTON --- */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-2 group">
         {/* Tooltip Label (Visible on hover or large screens) */}
         <div className="bg-white px-4 py-2 rounded-xl shadow-xl border-l-4 border-red-600 mb-2 animate-bounce origin-bottom-right hidden md:block">
            <p className="text-red-700 font-bold text-sm uppercase">Trung tâm Cấp cứu 115</p>
         </div>

         <Link 
            to="/emergency"
            className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-red-600 rounded-full shadow-lg shadow-red-600/40 hover:bg-red-700 hover:scale-110 transition-all duration-300"
            title="Truy cập Trung tâm điều hành cấp cứu thông minh"
         >
             {/* Ping Animation Ring */}
             <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
             
             {/* Icon Content */}
             <div className="relative z-10 flex flex-col items-center justify-center text-white">
                 <Phone size={28} className="animate-tada" strokeWidth={2.5} />
                 <span className="text-[10px] md:text-xs font-black mt-1">115</span>
             </div>
         </Link>
      </div>

      {/* Hero Banner Area */}
      <section className="relative bg-primary-900 text-white h-[500px] flex items-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/600?blur=2" 
            alt="Medical Banner" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content - Typography */}
          <div className="lg:col-span-7 space-y-6">
            <span className="bg-secondary-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
              Thông điệp tuần
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Chăm sóc sức khỏe toàn dân <br/>
              <span className="text-secondary-500">Nâng cao chất lượng cuộc sống</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl">
              Hệ thống y tế thủ đô không ngừng đổi mới, áp dụng công nghệ số vào khám chữa bệnh và quản lý hồ sơ sức khỏe.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/health-records" className="bg-white text-primary-900 px-6 py-3 rounded font-bold hover:bg-gray-100 transition shadow-lg flex items-center">
                Tra cứu Hồ sơ sức khỏe <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/news/events" className="border border-white text-white px-6 py-3 rounded font-bold hover:bg-white/10 transition">
                Tin tức mới nhất
              </Link>
            </div>
          </div>
          
          {/* Right Content - Quick Stats or Highlight */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg shadow-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Activity className="mr-2 text-secondary-500" />
                Số liệu hôm nay
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Lượt khám bệnh</span>
                  <span className="font-bold text-2xl">12,450</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Hồ sơ mới lập</span>
                  <span className="font-bold text-2xl text-secondary-400">842</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span>Xe cấp cứu đang chạy</span>
                  <span className="font-bold text-2xl text-orange-400">45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Menu Items Grid - The Core Requirement */}
      <section className="py-16 relative z-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary-900 mb-2 uppercase">Danh mục Dịch vụ & Thông tin</h3>
            <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Truy cập nhanh các thông tin và dịch vụ y tế thiết yếu của Sở Y tế Hà Nội.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.map((item) => {
              const Icon = item.icon || Activity;
              return (
                <Link 
                  key={item.id} 
                  to={item.path}
                  className={`
                    group relative rounded-2xl shadow-sm hover:shadow-xl border p-6 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center h-full overflow-hidden
                    ${item.containerClass}
                  `}
                >
                  {/* Decorative faint icon in background */}
                  <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110">
                    <Icon size={120} />
                  </div>

                  <div className={`
                    w-16 h-16 mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110 group-hover:rotate-3 relative z-10
                    ${item.iconBoxClass}
                  `}>
                    <Icon size={32} strokeWidth={2} />
                  </div>
                  
                  <h4 className={`font-bold mb-2 text-base md:text-lg leading-tight relative z-10 ${item.titleClass}`}>
                    {item.title}
                  </h4>
                  
                  {/* Subtle underline indicator */}
                  <div className="w-0 h-1 bg-current opacity-20 group-hover:w-1/2 transition-all duration-500 rounded-full mt-auto relative z-10"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* News Section (Preview) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
           <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-primary-900 uppercase">Tin tức nổi bật</h3>
              <div className="w-16 h-1 bg-secondary-500 mt-2"></div>
            </div>
            <Link to="/news/events" className="text-primary-600 hover:text-primary-800 text-sm font-semibold flex items-center bg-primary-50 px-4 py-2 rounded-full hover:bg-primary-100 transition">
              Xem tất cả <ArrowRight size={16} className="ml-1" />
            </Link>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Main Feature */}
             <div className="lg:col-span-2">
                <Link to={`/news/detail/${featuredNews.id}`} className="group block h-full bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="bg-secondary-100 text-secondary-700 px-3 py-1 text-xs font-bold uppercase rounded-full">{featuredNews.category}</span>
                       <span className="text-gray-400 text-xs flex items-center"><Calendar size={14} className="mr-1" /> {featuredNews.date}</span>
                    </div>
                    
                    <h4 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary-600 mb-4 leading-snug">{featuredNews.title}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-3">{featuredNews.excerpt}</p>
                  </div>
                </Link>
             </div>

             {/* Side List */}
             <div className="space-y-6">
               {sideNews.map(news => (
                 <Link key={news.id} to={`/news/detail/${news.id}`} className="flex gap-4 group bg-white border border-gray-100 p-4 rounded-xl hover:shadow-md transition">
                   <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                     <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                   </div>
                   <div className="flex flex-col justify-between py-1">
                     <h5 className="text-sm font-bold text-gray-800 group-hover:text-primary-600 line-clamp-2 leading-snug">{news.title}</h5>
                     <div className="flex items-center text-gray-400 text-xs mt-2">
                        <Calendar size={14} className="mr-1" /> {news.date}
                     </div>
                   </div>
                 </Link>
               ))}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;