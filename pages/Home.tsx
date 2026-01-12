
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, Phone, Play, Volume2, Globe, Trophy, Music, Video, Radio, List, ChevronRight } from 'lucide-react';
import { SERVICE_CATEGORIES, MOCK_NEWS, MOCK_VIDEOS, MOCK_CULTURE, MOCK_SPORTS, MOCK_INTERNATIONAL } from '../constants';

const Home = () => {
  const featuredNews = MOCK_NEWS[0];
  const newsList = MOCK_NEWS.slice(1, 5); // Take more items for the list
  const [activeChannel, setActiveChannel] = useState('H1');
  const [currentVideo, setCurrentVideo] = useState(MOCK_VIDEOS[0]);

  return (
    <div className="min-h-screen bg-gray-50 relative font-sans">
      
      {/* --- EMERGENCY FLOATING BUTTON --- */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-2 group">
         <div className="bg-white px-4 py-2 rounded-xl shadow-xl border-l-4 border-red-600 mb-2 animate-bounce origin-bottom-right hidden md:block">
            <p className="text-red-700 font-bold text-sm uppercase">Trung tâm Cấp cứu 115</p>
         </div>

         <Link 
            to="/emergency"
            className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-red-600 rounded-full shadow-lg shadow-red-600/40 hover:bg-red-700 hover:scale-110 transition-all duration-300"
            title="Truy cập Trung tâm điều hành cấp cứu thông minh"
         >
             <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
             <div className="relative z-10 flex flex-col items-center justify-center text-white">
                 <Phone size={28} className="animate-tada" strokeWidth={2.5} />
                 <span className="text-[10px] md:text-xs font-black mt-1">115</span>
             </div>
         </Link>
      </div>

      {/* Hero Banner Area */}
      <section className="relative bg-primary-900 text-white h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/banner/1920/600" 
            alt="Medical Banner" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
          
          {/* Quick Stats Box */}
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
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span>Xe cấp cứu đang chạy</span>
                  <span className="font-bold text-2xl text-orange-400">45</span>
                </div>
                {/* Source Added */}
                <p className="text-xs text-right opacity-70 italic pt-1 mt-2 border-t border-white/20">
                    (Nguồn: Phòng Kế hoạch Tài chính - SYT Hà Nội)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Menu Grid */}
      <section className="py-6 relative z-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-primary-900 mb-2 uppercase">Danh mục Dịch vụ & Thông tin</h3>
            <div className="w-20 h-1 bg-secondary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.map((item) => {
              const Icon = item.icon || Activity;
              return (
                <Link 
                  key={item.id} 
                  to={item.path}
                  className={`
                    group relative rounded-2xl shadow-sm hover:shadow-xl border py-8 px-4 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center h-full min-h-[220px] overflow-hidden justify-center
                    ${item.containerClass}
                  `}
                >
                  <div className={`
                    w-16 h-16 mb-4 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110 group-hover:rotate-3 relative z-10
                    ${item.iconBoxClass}
                  `}>
                    <Icon size={30} strokeWidth={1.5} />
                  </div>
                  
                  <h4 className={`font-bold mb-1 text-base md:text-lg leading-tight relative z-10 ${item.titleClass}`}>
                    {item.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOCUS & MULTIMEDIA SECTION (Redesigned with 1:2 Ratio) */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
           
           <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
             
             {/* LEFT COLUMN: TIÊU ĐIỂM (List Style) - 4 Columns (1/3 Width) */}
             <div className="xl:col-span-4">
                <div className="mb-4 border-b-2 border-red-600 pb-1">
                   <h3 className="text-xl font-bold text-red-600 uppercase flex items-center">
                     <span className="mr-2">★</span> Tiêu điểm
                   </h3>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Items */}
                    {MOCK_NEWS.slice(0, 5).map((news, idx) => (
                      <Link key={news.id} to={`/news/detail/${news.id}`} className="flex gap-4 group items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded bg-gray-200 shadow-sm relative">
                           <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                           {idx === 0 && <span className="absolute bottom-0 left-0 bg-red-600 text-white text-[10px] px-1 font-bold">HOT</span>}
                        </div>
                        <div className="flex flex-col">
                           <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 leading-snug line-clamp-3 mb-1">
                             {news.title}
                           </h4>
                           <span className="text-[11px] text-gray-400">{news.date}</span>
                        </div>
                      </Link>
                    ))}
                </div>
             </div>

             {/* RIGHT COLUMN: TRUYỀN HÌNH - PHÁT THANH - 8 Columns (2/3 Width) */}
             <div className="xl:col-span-8">
                 <div className="mb-4 border-b-2 border-red-600 pb-1 flex justify-between items-end">
                     <h3 className="text-xl font-bold text-red-600 uppercase flex items-center">
                       <Radio className="mr-2" size={20}/> Truyền hình - Phát thanh
                     </h3>
                     <Link to="/media" className="text-xs text-gray-500 hover:text-red-600">Xem tất cả {'>>'}</Link>
                 </div>

                 {/* Dark Media Container */}
                 <div className="bg-[#0f172a] rounded-lg overflow-hidden shadow-xl border border-gray-800">
                    
                    {/* Channel Tabs */}
                    <div className="flex bg-[#1e293b] border-b border-gray-700">
                       <div className="px-4 py-3 flex items-center text-white font-bold text-sm bg-gray-800 border-r border-gray-700">
                          <List size={16} className="mr-2"/> KÊNH
                       </div>
                       {['H1', 'H2', 'FM90', 'JOYFM'].map(channel => (
                         <button 
                            key={channel}
                            onClick={() => setActiveChannel(channel)}
                            className={`px-6 py-3 text-sm font-bold uppercase transition-colors relative
                              ${activeChannel === channel 
                                ? 'text-red-500 bg-[#0f172a]' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                              }`}
                         >
                            {channel}
                            {activeChannel === channel && <span className="absolute top-0 left-0 right-0 h-0.5 bg-red-600"></span>}
                         </button>
                       ))}
                    </div>

                    <div className="flex flex-col md:flex-row h-[450px]">
                       {/* Main Video Player (Wider) */}
                       <div className="md:w-3/4 bg-black relative group cursor-pointer border-r border-gray-800">
                           <img 
                              src={currentVideo.thumbnail} 
                              alt="Video cover" 
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition"
                           />
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                               <div className="w-20 h-20 rounded-full bg-red-600/90 text-white flex items-center justify-center group-hover:scale-110 transition shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                                   <Play size={40} fill="currentColor" className="ml-1"/>
                               </div>
                           </div>
                           <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                               <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded uppercase">Trực tiếp</span>
                                  <span className="text-gray-300 text-sm">{currentVideo.date}</span>
                               </div>
                               <h3 className="text-white font-bold text-2xl leading-tight line-clamp-2">{currentVideo.title}</h3>
                           </div>
                       </div>

                       {/* Playlist Sidebar (Narrower) */}
                       <div className="md:w-1/4 bg-[#1e293b] overflow-y-auto no-scrollbar">
                           <div className="p-3">
                              {MOCK_VIDEOS.map((video, idx) => (
                                 <div 
                                    key={video.id} 
                                    onClick={() => setCurrentVideo(video)}
                                    className={`flex flex-col gap-2 p-2 rounded cursor-pointer mb-2 transition border border-transparent
                                       ${currentVideo.id === video.id ? 'bg-gray-700 border-gray-600' : 'hover:bg-gray-800'}
                                    `}
                                 >
                                    <div className="w-full aspect-video bg-gray-900 rounded overflow-hidden flex-shrink-0 relative">
                                       <img src={video.thumbnail} className="w-full h-full object-cover opacity-80" alt=""/>
                                       <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded">{video.duration}</span>
                                    </div>
                                    <div className="flex-1">
                                       <h5 className={`text-xs font-bold leading-snug line-clamp-3 ${currentVideo.id === video.id ? 'text-red-400' : 'text-gray-300'}`}>
                                          {video.title}
                                       </h5>
                                    </div>
                                 </div>
                              ))}
                              
                              <Link to="/media" className="block text-center text-xs text-gray-400 hover:text-white py-2 border-t border-gray-700 mt-2">
                                 Xem tất cả
                              </Link>
                           </div>
                       </div>
                    </div>

                 </div>
             </div>

           </div>

        </div>
      </section>

      {/* NEW: SECTION VĂN HÓA - THỂ THAO - QUỐC TẾ (3 Columns) */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                
                {/* Column 1: VĂN HÓA */}
                <div className="pt-6 md:pt-0">
                    <div className="mb-4 flex items-center gap-2">
                        <Music className="text-pink-600" size={20}/>
                        <h3 className="text-lg font-bold text-primary-900 uppercase">Văn hóa</h3>
                    </div>
                    {/* First item big */}
                    <div className="group mb-4 cursor-pointer">
                        <div className="aspect-[3/2] rounded overflow-hidden mb-2 bg-gray-100">
                            <img src={MOCK_CULTURE[0].image} alt={MOCK_CULTURE[0].title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
                        </div>
                        <h4 className="font-bold text-gray-800 leading-snug group-hover:text-pink-600">{MOCK_CULTURE[0].title}</h4>
                    </div>
                    {/* List */}
                    <ul className="space-y-3">
                        {MOCK_CULTURE.slice(1).map(item => (
                            <li key={item.id} className="text-sm text-gray-600 border-t border-gray-100 pt-2 hover:text-pink-600 cursor-pointer line-clamp-2">
                                • {item.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2: THỂ THAO */}
                <div className="pt-6 md:pt-0 md:pl-8">
                    <div className="mb-4 flex items-center gap-2">
                        <Trophy className="text-orange-500" size={20}/>
                        <h3 className="text-lg font-bold text-primary-900 uppercase">Thể thao</h3>
                    </div>
                    <div className="group mb-4 cursor-pointer">
                        <div className="aspect-[3/2] rounded overflow-hidden mb-2 bg-gray-100">
                            <img src={MOCK_SPORTS[0].image} alt={MOCK_SPORTS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
                        </div>
                        <h4 className="font-bold text-gray-800 leading-snug group-hover:text-orange-600">{MOCK_SPORTS[0].title}</h4>
                    </div>
                    <ul className="space-y-3">
                        {MOCK_SPORTS.slice(1).map(item => (
                            <li key={item.id} className="text-sm text-gray-600 border-t border-gray-100 pt-2 hover:text-orange-600 cursor-pointer line-clamp-2">
                                • {item.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2: QUỐC TẾ */}
                <div className="pt-6 md:pt-0 md:pl-8">
                    <div className="mb-4 flex items-center gap-2">
                        <Globe className="text-blue-500" size={20}/>
                        <h3 className="text-lg font-bold text-primary-900 uppercase">Quốc tế</h3>
                    </div>
                    <div className="group mb-4 cursor-pointer">
                        <div className="aspect-[3/2] rounded overflow-hidden mb-2 bg-gray-100">
                            <img src={MOCK_INTERNATIONAL[0].image} alt={MOCK_INTERNATIONAL[0].title} className="w-full h-full object-cover group-hover:scale-105 transition"/>
                        </div>
                        <h4 className="font-bold text-gray-800 leading-snug group-hover:text-blue-600">{MOCK_INTERNATIONAL[0].title}</h4>
                    </div>
                    <ul className="space-y-3">
                        {MOCK_INTERNATIONAL.slice(1).map(item => (
                            <li key={item.id} className="text-sm text-gray-600 border-t border-gray-100 pt-2 hover:text-blue-600 cursor-pointer line-clamp-2">
                                • {item.title}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
